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

  const snippet = getFile("../../liquid/theme.liquid");

  const page = data.asset.value;

  if (page.includes(snippet)) {
    console.log("Page already has the snippet installed");
    return;
  }

  const newPage = page.replace(
    "{% section 'header' %}",
    `\n{% section 'header' %}\n${snippet}`
  );

  return newPage;
}

async function uploadAssetTheme(url, token, id, page, pageName) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({
      asset: {
        key: pageName,
        value: page,
      },
    }),
  };

  const response = await fetch(`${url}/themes/${id}/assets.json`, options);
  const data = await response.json();
  console.log("Upload page data:", data);
}

function getFile(fileName) {
  return fs.readFileSync(path.resolve(__dirname, fileName));
}

export async function updateTheme(shop, accessToken) {
  const baseURL = `https://${shop}/admin/api/2021-01`;
  const mainThemeId = await getThemeId(baseURL, accessToken);

  if (!mainThemeId) {
    return;
  }

  const newPage = await getAssetThemeLiquid(mainThemeId, baseURL, accessToken);

  if (newPage) {
    await uploadAssetTheme(
      baseURL,
      accessToken,
      mainThemeId,
      newPage,
      "layout/theme.liquid"
    );
  }

  const newSnippet = getFile("../../liquid/ch-banner.liquid");

  await uploadAssetTheme(
    baseURL,
    accessToken,
    mainThemeId,
    `${newSnippet}`,
    "snippets/ch-banner.liquid"
  );
}
