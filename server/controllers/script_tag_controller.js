import fetch from "node-fetch";

export async function createScriptTag(shop, token) {
  const url = getScriptTagUrl(shop);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: {
      script_tag: {
        event: "onload",
        src: "https://google.com",
      },
    },
  };

  try {
    const response = await fetch(url, options);
    console.log(response.data);
  } catch (error) {
    console.error(`Error creating a new tag: ${error}`);
  }
}

function getBaseUrl(shop) {
  return `https://${shop}`;
}

function getAllScriptTagsUrl(shop) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`;
}

function getScriptTagUrl(shop, id) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags/${id}.json`;
}

function getCreateScriptTagUrl(shop) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`;
}

function getDeleteScriptTagUrl(shop, id) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags/${id}.json`;
}
