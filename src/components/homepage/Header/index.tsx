import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";

const Header = () => {
  return (
    <header className="bg-[#F2F0F1] py-10 md:pt-24 overflow-hidden">
      <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-4 xl:px-0">
        <section className="max-w-frame px-4 mb-6 lg:mb-0">
          <motion.h2
            initial={{ y: "100px", opacity: 0, rotate: 10 }}
            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn([
              "text-3xl lg:text-[64px] lg:leading-[64px] mb-5 lg:mb-8 font-bold",
            ])}
          >
            Unique
            <br />
            Album Cover Art
          </motion.h2>
          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-black/60 text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px]"
          >
            Original artwork designed for your music. Find the perfect cover for your next release.
          </motion.p>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href="/products"
              className="w-full md:w-56 mb-5 md:mb-12 inline-block text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-lg hover:animate-pulse"
            >
              Browse Gallery
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 md:mb-[116px]"
          >
            <div className="flex flex-col">
              <span className="font-bold md:text-lg lg:text-2xl xl:mb-2">
                500+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Designs
              </span>
            </div>
            <div className="flex flex-col ml-6 md:ml-0">
              <span className="font-bold md:text-lg lg:text-2xl xl:mb-2">
                1000+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Downloads
              </span>
            </div>
          </motion.div>
        </section>
        <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Image
                unoptimized
                priority
                className="w-full h-auto rounded-xl"
                src="/images/pic1.png"
                height={748}
                width={500}
                alt="first-cover"
              />
              <Image
                unoptimized
                priority
                className="w-full h-auto rounded-xl"
                src="/images/pic7.png"
                height={748}
                width={500}
                alt="first-cover"
              />
            </div>
            <div className="mt-4 space-y-4">
              <Image
                unoptimized
                priority
                className="w-full h-auto lg:ml-4 rounded-xl"
                src="/images/pic5.png"
                height={748}
                width={500}
                alt="first-cover"
              />
              <Image
                unoptimized
                priority
                className="w-full h-auto lg:ml-4 rounded-xl"
                src="/images/pic15.png"
                height={748}
                width={500}
                alt="first-cover"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </header>
  );
};

export default Header;
