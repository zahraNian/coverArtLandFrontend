import React from "react";

export type SpecItem = {
  label: string;
  value: string;
};

const specsData: SpecItem[] = [
  {
    label: "Key A:",
    value: "Usage Rights",
  },
  {
    label: "Key B:",
    value: "✓ Commercial use allowed",
  },
  {
    label: "Key C:",
    value: "✓ Streaming platforms",
  },
  {
    label: "Key D:",
    value: "✓ Physical releases",
  },
];

const ProductDetails = () => {
  return (
    <>
      {specsData.map((item, i) => (
        <div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-2 pr-2 text-neutral-500">
              {item.label}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4">
            <p className="text-sm w-full leading-5 text-neutral-800 font-medium">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
