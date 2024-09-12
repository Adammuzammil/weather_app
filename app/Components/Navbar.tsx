"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import Search from "./Search/Search";
import { useGlobalContext } from "../Context/globalContext";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container w-full flex gap-2 sm:w-fit">
        <Search />
        <div className="btn-grp flex items-center gap-2">
          <ThemeDropdown />
          <Button className="source-code-btn flex items-center gap-2">
            <Link
              href={"https://github.com/Adammuzammil/weather_app.git"}
              className="flex items-center gap-2"
              target="_blank"
            >
              {github} Source Code
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
