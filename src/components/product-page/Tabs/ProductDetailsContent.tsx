import React from "react";
import ProductDetails from "./ProductDetails";

const ProductDetailsContent = ({ product }: { product: any }) => {
  const specItems = [
    product?.resolution ? { label: "Resolution:", value: String(product.resolution) } : null,
    product?.colorSpace ? { label: "Color Space:", value: String(product.colorSpace) } : null,
    product?.formats ? { label: "Formats:", value: String(product.formats) } : null,
    product?.currency ? { label: "Currency:", value: String(product.currency) } : null,
    product?.basePrice ? { label: "Base Price:", value: String(product.basePrice) } : null,
    product?.currentPrice ? { label: "Current Price:", value: String(product.currentPrice) } : null,
    typeof product?.isExclusive === 'boolean' ? { label: "Exclusive:", value: product.isExclusive ? "Yes" : "No" } : null,
    product?.createdAt ? { label: "Created:", value: new Date(product.createdAt).toLocaleDateString() } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section>
      <h3 className="text-xl font-semibold text-gray-700 mb-5 sm:mb-4">
        Product Information
      </h3>
      <div className="prose max-w-none prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-a:text-blue-600">
        {product?.longDescription ? (
          <div dangerouslySetInnerHTML={{ __html: String(product.longDescription) }} />
        ) : product?.description ? (
          <p>{String(product.description)}</p>
        ) : null}
      </div>
      <div className="mt-8">
        <ProductDetails items={specItems} />
      </div>
    </section>
  );
};

export default ProductDetailsContent;
