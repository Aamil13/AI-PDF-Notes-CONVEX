"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";

import { CiSearch } from "react-icons/ci";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { CgBell } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";

import { useSelectedLayoutSegment } from "next/navigation";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import useAppStore from "@/Store/useAppStore";
import Switch from "../ThemeToggleButton";
import useDeviceType from "@/Hooks/useDeviceType";

const Navbar = () => {
  const segment = useSelectedLayoutSegment();
  const { toggleNavbar, isNavbarCollapsed, toggleShowSideBarOnMobile } =
    useAppStore();
  const { isMobile } = useDeviceType();

  const handleSideBarClick = () => {
    if (isMobile) {
      toggleShowSideBarOnMobile();
    } else {
      toggleNavbar();
    }
  };
  return (
    <nav className="pt-5 pb-0 mb-8 flex justify-between">
      <div className="font-semibold flex gap-2">
        {!isNavbarCollapsed ? (
          <TbLayoutSidebarLeftCollapseFilled
            onClick={handleSideBarClick}
            className="cursor-pointer "
          />
        ) : (
          <TbLayoutSidebarRightCollapseFilled
            onClick={handleSideBarClick}
            className="cursor-pointer "
          />
        )}

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer text-xs text-neutral-400">
                PDF
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-xs" href={`/${segment}`}>
                {segment?.toUpperCase()}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="hidden gap-4 items-center md:flex">
        <div className="relative">
          <CiSearch className="absolute top-1/2 -translate-y-1/2 left-1" />
          <Input
            className=" ps-6 w-72 rounded-xl border-0 bg-white dark:bg-neutral-600"
            placeholder="Search"
          />
        </div>
        <div className="border-2 border-[#3CC0FC] text-[#3CC0FC] rounded-full text-xs font-semibold p-2 cursor-pointer">
          Upgrade
        </div>
        <Switch />
        <AiOutlineQuestionCircle className="text-xl cursor-pointer" />
        <CgBell className="text-xl cursor-pointer" />
        <FaUserCircle className="text-4xl cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
