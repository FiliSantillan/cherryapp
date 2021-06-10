import React, { useEffect, useState } from "react";
import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

function install() {
  const app = useAppBridge();
  const [isInstalled, setIsInstalled] = useState(null);
  const [scriptTagId, setScriptTagId] = useState();
  const titleDescription = isInstalled ? "Uninstall" : "Install";
  const bodyDescription = isInstalled ? "installed" : "uninstalled";

  async function fetchScriptTags() {
    const token = await getSessionToken(app);

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      "https://2eb084f8fa5d.ngrok.io/script_tag/all",
      options
    );

    const data = await response.json();
    setIsInstalled(data.installed);

    if (data.details.length > 0) {
      setScriptTagId(data.details[0].id);
    }
  }

  useEffect(() => {
    fetchScriptTags();
  }, []);

  async function handleAction() {
    const token = await getSessionToken(app);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (!isInstalled) {
      const options = {
        method: "POST",
        headers,
      };

      await fetch("https://2eb084f8fa5d.ngrok.io/script_tag", options);
    } else {
      const options = {
        method: "DELETE",
        headers,
      };

      await fetch(
        `https://2eb084f8fa5d.ngrok.io/script_tag/?id=${scriptTagId}`,
        options
      );
    }

    setIsInstalled((oldValue) => !oldValue);
  }

  return (
    <Page>
      <Layout.AnnotatedSection
        title={`${titleDescription} banner`}
        description="Toggle banner installation on your shop"
      >
        <SettingToggle
          action={{
            content: titleDescription,
            onAction: handleAction,
          }}
          enabled={true}
        >
          The banner script is
          <TextStyle variation="strong"> {bodyDescription}</TextStyle>
        </SettingToggle>
      </Layout.AnnotatedSection>
    </Page>
  );
}

export default install;
