import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

export async function connect(url, options) {
  const app = useAppBridge();
  const token = await getSessionToken(app);

  options.headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
