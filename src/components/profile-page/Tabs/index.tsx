"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import MyAccount from "./MyAccount";
import Orders from "./Orders";
import Tickets from "./Tickets";
import { useTicketsStore } from "@/store/tickets";

type TabBtn = {
  id: number;
  label: string;
};

const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: "My Account",
  },
  {
    id: 2,
    label: "Orders",
  },
  {
    id: 3,
    label: "Tickets",
  },
];

const Tabs = ({ user }: { user: any }) => {
  const [active, setActive] = useState<number>(1);
  const unread = useTicketsStore((s) => s.unreadCount);
  const markAllRead = useTicketsStore((s) => s.markAllRead);

  useEffect(() => {
    if (active === 3) {
      markAllRead();
    }
  }, [active, markAllRead]);

  return (
    <div>
      <div className="flex items-center mb-6 sm:mb-8 overflow-x-auto">
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            type="button"
            className={cn([
              active === tab.id
                ? "border-black border-b-2 font-medium"
                : "border-b border-black/10 text-black/60 font-normal",
              "p-5 sm:p-6 rounded-none flex-1",
            ])}
            onClick={() => setActive(tab.id)}
          >
            <span className="relative inline-flex items-center">
              {tab.label}
              {tab.id === 3 && unread > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] text-[11px] leading-none rounded-full bg-red-600 text-white px-1">
                  {unread}
                </span>
              )}
            </span>
          </Button>
        ))}
      </div>
      <div className="mb-12 sm:mb-16">
        {active === 1 && <MyAccount user={user} />}
        {active === 2 && <Orders />}
        {active === 3 && <Tickets />}
      </div>
    </div>
  );
};

export default Tabs;
