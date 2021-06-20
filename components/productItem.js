import React from "react";
import { ResourceList, Stack, TextStyle, Thumbnail } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";

function productItem({ product }) {
  const image = product.images[0] ? product.images[0].originalSrc : ImageMajor;
  const media = <Thumbnail source={image} />;
  const price = product.variants[0].price;

  return (
    <ResourceList.Item
      media={media}
      key={product.id}
      accessibilityLabel={`View details for ${product.title}`}
    >
      <Stack>
        <Stack.Item fill>
          <h4>
            <TextStyle variation="strong">{product.title}</TextStyle>
          </h4>
        </Stack.Item>
        <Stack.Item>${price}</Stack.Item>
      </Stack>
    </ResourceList.Item>
  );
}

export default productItem;
