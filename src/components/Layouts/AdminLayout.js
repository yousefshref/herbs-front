import React from "react";
import { AiFillShop } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";

const AdminLayout = ({ children }) => {
  return (
    <div dir="rtl" className="cairo">
      <div className="flex md:flex-row flex-col h-full items-center w-full">
        {/* navigation */}
        <div className="p-1 md:min-w-[200px] md:w-[200px] w-[70px] h-full fixed bottom-0 md:px-1 justify-between right-0 flex flex-col items-center from-indigo-600 to-indigo-400 md:rounded-e-full bg-gradient-to-t text-white">
          <div className="flex flex-col gap-4">
            <img
              className="md:mx-0 mx-auto w-[60px]"
              src="/logos/humming-bird.png"
            />
            <div className="flex flex-col gap-2">
              <div className="flex transition-all hover:bg-white/40 p-2 px-8 cursor-pointer rounded-xl md:rounded-tl-full items-center gap-2">
                <span className="md:text-base text-2xl">
                  <AiFillShop />
                </span>
                <p className="md:block hidden">المنتجات</p>
              </div>
              <div className="flex transition-all hover:bg-white/40 p-2 px-8 cursor-pointer rounded-xl items-center gap-2">
                <span className="md:text-base text-2xl">
                  <FaCartShopping />
                </span>
                <p className="md:block hidden">الطلبات</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:mb-[10vw] sm:mb-[15vw]">
            <div className="flex transition-all hover:bg-red-300/40 p-2 px-8 cursor-pointer rounded-xl rounded-bl-full items-center gap-2">
              <span className="md:text-base text-2xl">
                <CiSettings />
              </span>
              <p className="md:block hidden">الإعدادات</p>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="p-2 md:w-[calc(100%-220px)] w-[calc(100%-80px)] ms-auto flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
