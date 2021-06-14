import fetch from "node-fetch";
import fs from "fs";
import path from "path";

async function getShopifyData(url, token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function getThemeId(url, token) {
  const data = await getShopifyData(`${url}/themes.json`, token);
  const mainTheme = await data.themes.find((theme) => theme.role === "main");

  if (!mainTheme) {
    console.log("No main theme found");
    return;
  }

  return mainTheme.id;
}

async function getAssetThemeLiquid(id, url, token) {
  const data = await getShopifyData(
    `${url}/themes/${id}/assets.json?asset[key]=layout/theme.liquid`,
    token
  );

  if (!data.asset.value) {
    return;
  }

  const snippet = fs.readFileSync(
    path.resolve(__dirname, "../../liquid/theme.liquid")
  );

  let newPage = data.asset.value;

  if (newPage.includes(snippet)) {
    console.log("Page already has the snippet installed");
    return;
  }

  newPage = data.asset.value.replace(
    "{% section 'header' %}",
    `{% section 'header' %}\n${snippet}`
  );

  console.log("New page:", newPage);
  return newPage;
}

export async function updateTheme(shop, accessToken) {
  const baseURL = `https://${shop}/admin/api/2021-01`;
  const mainThemeId = await getThemeId(baseURL, accessToken);

  if (!mainThemeId) {
    return;
  }

  await getAssetThemeLiquid(mainThemeId, baseURL, accessToken);
}
