import React from "react";
import { EmptyState } from "@shopify/polaris";

function ProductEmptyState({ setIsOpen }) {
  return (
    <EmptyState
      heading="Manage the products you want to display"
      action={{
        content: "Select products",
        onAction: () => setIsOpen(true),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Select the products you want to use on CherryApp.</p>
    </EmptyState>
  );
}

export default ProductEmptyState;
