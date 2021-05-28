import React, { useState } from "react";
import { Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

function index() {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);

    function handleProductSelection(payload) {
        setIsOpen(false);
        setProducts(payload.selection)
    }


    return (
        <Page
            fullWidth
            title="Product Selector"
            primaryAction={{
                content: "Select product",
                onAction: () => setIsOpen(true),
        }}>
            <ResourcePicker
                resourceType="Product"
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                onSelection={handleProductSelection}
            />

            {products.map((product) => (
                <div>{product.title}</div>
            ))}

        </Page>
    );
}

export default index;
