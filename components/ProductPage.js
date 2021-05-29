import React from "react";
import { Page } from "@shopify/polaris";
import ProductList from "./ProductList";

function ProductPage({ setIsOpen, products }) {
  return (
    <Page
      fullWidth
      title="Product Selector"
      primaryAction={{
        content: "Select product",
        onAction: () => setIsOpen(true),
      }}
    >
      <ProductList products={products} />
    </Page>
  );
}

export default ProductPage;
