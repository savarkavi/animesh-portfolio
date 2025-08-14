"use client";

import { TiThMenu } from "react-icons/ti";

const MobileMenu = () => {
  return (
    <div className="absolute top-0 left-0 w-full md:hidden">
      <TiThMenu className="absolute top-4 left-1/2 z-[99] size-8 -translate-x-1/2 text-white" />
    </div>
  );
};

export default MobileMenu;
