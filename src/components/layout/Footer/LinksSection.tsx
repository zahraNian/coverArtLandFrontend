import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinksData: FooterLinks[] = [

  {
    id: 1,
    title: "Quick Links",
    children: [
      {
        id: 21,
        label: "Browse Gallery",
        url: "#",
      },
      {
        id: 23,
        label: "Contact Us",
        url: "#",
      },
      {
        id: 24,
        label: "Privacy Policy",
        url: "#",
      },
      {
        id: 25,
        label: "FAQ",
        url: "/faq",
      },
    ],
  },
  {
    id: 2,
    title: "company",
    children: [
      {
        id: 11,
        label: "about",
        url: "#",
      },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                link.id !== 41 && link.id !== 43 && "capitalize",
                "text-black/60 text-sm md:text-base mb-4 w-fit",
              ])}
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
