import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { AuthButton } from '@/components/auth/auth-button'
import NavbarSearch from "@/components/layout/Navbar/TopNavbar/NavbarSearch";

const data: NavMenu = [
  {
    id: 1,
    type: "MenuItem",
    label: "Home",
    url: "/",
    children: [],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "Browse All",
    url: "/shop",
    children: [],
  },
    {
    id: 3,
    type: "MenuItem",
    label: "Blog",
    url: "/blog",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "About",
    url: "/about",
    children: [],
  },
  {
    id: 5,
    type: "MenuItem",
    label: "FAQ",
    url: "/faq",
    children: [],
  },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center flex-shrink-0">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] leading-none mr-3 lg:mr-10",
            ])}
          >
            CoverArtLand
          </Link>
        </div>
        <div className="flex items-center flex-1 min-w-0 justify-center md:justify-start overflow-hidden">
          <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
            <NavigationMenuList>
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  {item.type === "MenuItem" && (
                    <MenuItem label={item.label} url={item.url} />
                  )}
                  {item.type === "MenuList" && (
                    <MenuList data={item.children} label={item.label} />
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* <NavbarSearch /> */}
        </div>
        <div className="flex items-center flex-shrink-0">
          <CartBtn />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
