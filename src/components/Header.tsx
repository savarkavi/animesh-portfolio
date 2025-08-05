import { electroharmonix, nuku } from "@/app/page";
import { headerItems } from "@/utils/constants";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 z-10 hidden w-full justify-between p-6 md:flex">
      <div className="flex w-full items-center justify-center gap-10 xl:justify-start">
        {headerItems.map((item) => (
          <button
            key={item.id}
            className="cursor-pointer bg-white px-4 py-1 text-sm font-extrabold text-black uppercase shadow-[-5px_5px_0px_0px_#6D28D9]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
