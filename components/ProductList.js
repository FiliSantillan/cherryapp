import React from "react";
import { Card, ResourceList } from "@shopify/polaris";
import ProductItem from "./productItem";

function ProductList({ products }) {
  return (
    <div>
      <Card>
        <ResourceList
          showHeader
          resourceName={{ singular: "Producto", plural: "Productos" }}
          items={products}
          renderItem={(product) => {
            return <ProductItem product={product} />;
          }}
        />
      </Card>
    </div>
  );
}

export default ProductList;
