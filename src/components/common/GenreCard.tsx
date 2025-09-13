import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GenreItem } from "@/types/productGenre.types";

type ProductCardProps = {
  data: GenreItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Link
      href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className="flex flex-col items-center aspect-auto border rounded-xl p-8 hover:bg-slate-50"
    >
      <div className={`${data.iconClass} w-10 h-10 rounded-md flex justify-center items-center`}>
        <Image
          src={data.srcUrl}
          width={22}
          height={22}
          className="invert sepia saturate-200 hue-rotate-180"
          alt={data.title}
          priority
        />
      </div>
      <strong className="text-black xl:text-lg mt-4">{data.title}</strong>
      <p className="text-gray-600 xl:text-lg">{data.designCount}  designs</p>
    </Link>
  );
};

export default ProductCard;
