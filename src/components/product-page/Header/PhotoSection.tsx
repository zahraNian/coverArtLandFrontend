"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center bg-[#F0EEED] rounded-lg w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0">
        <Image
          src={selected}
          width={444}
          height={530}
          className="rounded-md w-full h-full object-cover"
          alt={data.title}
          priority
          unoptimized
        />
      </div>
      {data?.gallery && data.gallery.length > 1 && (
        <div className="flex space-x-3 space-y-3 w-full lg:w-fit items-center lg:justify-start justify-center">
          {data.gallery.map((photo, index) => (
            <button
              key={index}
              type="button"
              className="bg-[#F0EEED] rounded-lg w-full max-w-[70px] xl:max-w-[90px] max-h-[70px] xl:max-h-[90px] xl:min-h-[70px] aspect-square overflow-hidden"
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo}
                width={90}
                height={90}
                className="rounded-lg w-full h-full object-cover hover:scale-110 transition-all duration-500"
                alt={data.title}
                priority
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSection;
