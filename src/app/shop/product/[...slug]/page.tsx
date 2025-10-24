import {
  relatedProductData,
} from "@/app/page";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import { BaseApiService } from "@/lib/api";

const fakeProduct = {
  id: 12345,
  title: "کاور فیک - نمونه",
  description: "توضیحات تستی برای محصول فیک",
  price: 99900,
  images: [
    { url: "/images/fake-1.jpg", alt: "عکس تست" }
  ],
  rating: 10,
  discount: {
    percentage: 2
  }
};

async function fetchProduct(id: number) {
  const api = new BaseApiService({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
  try {
    const product = await api.get<Product>(`/products/${id}`, { cache: "no-store" });
    //ToDo remove fakeProduct
    return product || fakeProduct;
  } catch (e) {
    //ToDo replace fakeProduct with e
    return fakeProduct;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const id = Number(params.slug?.[0]);
  if (!id || Number.isNaN(id)) {
    notFound();
  }

  const productData = await fetchProduct(id);

  if (!productData?.title) {
    notFound();
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}
