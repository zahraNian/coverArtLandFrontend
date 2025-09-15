"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";
import Image from "next/image";

const AddToCardSection = ({ data }: { data: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="fixed md:relative w-full gap-x-3 bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      {/* <CartCounter onAdd={setQuantity} onRemove={setQuantity} /> */}
      <AddToCartBtn data={{ ...data, quantity }} />
      <button className="w-14 h-10 px-4 border-2 rounded-lg flex items-center hover:scale-105 transition">
        <Image
          src="/icons/heart.svg"
          width={15}
          height={15}
          alt={data.title}
          priority
        />
      </button>
      <button className="w-14 h-10 px-4 border-2 rounded-lg flex items-center hover:scale-105 transition">
        <Image
          src="/icons/share.svg"
          width={15}
          height={15}
          alt={data.title}
          priority
        />
      </button>
    </div>
  );
};

export default AddToCardSection;
