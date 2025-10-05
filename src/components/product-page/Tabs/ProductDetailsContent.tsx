import React from "react";
import ProductDetails from "./ProductDetails";

const ProductDetailsContent = () => {
  return (
    <section>
      <h3 className="text-xl font-semibold text-gray-700 mb-5 sm:mb-4">
        Product Information
      </h3>
      <ProductDetails />
    </section>
  );
};

export default ProductDetailsContent;
