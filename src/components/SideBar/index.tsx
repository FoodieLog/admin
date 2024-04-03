"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { SIDE_BAR_USER_CATEGORY, SIDE_BAR_MENU } from "@/constants";

function SideBar() {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const onSubMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSubMenu(!showSubMenu);
  };

  return (
    <section
      id="logo-sidebar"
      className="sticky top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 whitespace-nowrap"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
        <Link href="/" className="flex items-center pl-2.5 mb-5">
          <Image
            width={100}
            height={30}
            priority
            src={"/textLogo.png"}
            className="h-6 mr-3 sm:h-7"
            alt="Flowbite Logo"
          />
        </Link>
        <ul className="space-y-2 font-medium">
          <li>
            <button
              type="button"
              onClick={onSubMenuClick}
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 "
            >
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                회원 관리
              </span>
              {!showSubMenu ? (
                <KeyboardDoubleArrowRightIcon />
              ) : (
                <KeyboardDoubleArrowDownIcon />
              )}
            </button>
            {showSubMenu ? (
              <ul className="py-2 space-y-2">
                {SIDE_BAR_USER_CATEGORY.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.src}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 pr-[84px] group hover:bg-gray-200 "
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>

          {SIDE_BAR_MENU.map((item, i) => (
            <li key={i}>
              <Link
                href={item.src}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200 "
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SideBar;
