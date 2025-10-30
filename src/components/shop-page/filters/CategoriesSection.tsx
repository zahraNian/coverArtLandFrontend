import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "T-shirts",
    slug: "/products?category=t-shirts",
  },
  {
    title: "Shorts",
    slug: "/products?category=shorts",
  },
  {
    title: "Shirts",
    slug: "/products?category=shirts",
  },
  {
    title: "Hoodie",
    slug: "/products?category=hoodie",
  },
  {
    title: "Jeans",
    slug: "/products?category=jeans",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <MdKeyboardArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;
