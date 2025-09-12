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
      className="flex flex-col items-center aspect-auto border rounded-xl p-8"
    >
      <Image
        src={data.srcUrl}
        width={40}
        height={40}
        className="rounded-md"
        alt={data.title}
        priority
      />
      <strong className="text-black xl:text-lg mt-4">{data.title}</strong>
      <p className="text-gray-600 xl:text-lg">{data.designCount}  designs</p>
    </Link>
  );
};

export default ProductCard;
