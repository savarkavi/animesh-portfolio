import { electroharmonix, nuku } from "@/app/page";
import Image from "next/image";
import React from "react";

const Header = () => {
  const headerItems = [
    { id: 1, label: "Home" },
    { id: 2, label: "Works" },
    { id: 3, label: "About" },
    { id: 4, label: "Contact" },
  ];

  return (
    <div className="absolute top-0 z-10 flex w-full justify-between p-6">
      <div className="flex items-center gap-10">
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
