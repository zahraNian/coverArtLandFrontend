import React from "react";
import OrderCard from "@/components/profile-page/OrderCard"

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
  const order = {
    orderNumber: "ORD-001",
    placedOn: "1/15/2024",
    total: 80,
    status: "Completed" as const,
    items: [
      { name: "Neon Dreams", quantity: 1, price: 45 },
      { name: "Cosmic Voyage", quantity: 1, price: 35 },
    ],
  }

  return (
    <div className="p-4">
      <OrderCard {...order} />
    </div>
  )
}
export default ProductDetails;
