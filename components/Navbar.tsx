"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Icons } from "./ui/icons";

const navbarData = [
  {
    label: "Courses",
    href: "/courses",
    submenu: [
      { label: "All Courses", href: "/courses/all" },
      { label: "My Courses", href: "/courses/mine" },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    submenu: [
      { label: "Profile", href: "/settings/profile" },
      { label: "Account", href: "/settings/account" },
    ],
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    submenu: [],
  },
  {
    label: "Students",
    href: "/students",
    submenu: [],
  },
];

const navbarData1 = [
  {
    label: "Dashboard",
    href: "/dashboard",
    submenu: [],
  },
  {
    label: "Students",
    href: "/students",
    submenu: [],
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export const Navbar = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [navbarBg, setNavbarBg] = useState<string>("");

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setNavbarBg("bg-gunmetal shadow-lg");
      } else {
        setNavbarBg("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-between p-4 items-center w-full fixed top-0 transition-colors duration-300 ${navbarBg} z-50  `}
    >
      <Drawer disablePreventScroll={true} direction="left">
        <DrawerTrigger>
          <Icons.menu className="w-6 h-6 text-white" />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-gunmetal">Menu</DrawerTitle>
            <DrawerDescription className="text-gunmetal">
              Select an option below
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-2">
            {navbarData.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between text-gunmetal text-left px-4 py-2 hover:rounded hover:bg-accent"
                >
                  <span>{item.label}</span>
                  {item.submenu.length > 0 && (
                    <span>
                      {expandedIndex === index ? (
                        <Icons.chevronDown />
                      ) : (
                        <Icons.chevronRight />
                      )}
                    </span>
                  )}
                </button>

                {expandedIndex === index && item.submenu.length > 0 && (
                  <div className="pl-4 ">
                    {item.submenu.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => router.push(subItem.href)}
                        className="w-full text-left hover:bg-accent rounded p-2 text-gunmetal"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <DrawerFooter>
            <DrawerClose>
              <button className="mt-4 bg-gunmetal p-4 text-white w-full rounded">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <ul className="gap-6 hidden sm:flex">
        {navbarData1.map((item, index) => (
          <li
            key={index}
            className="p-2 rounded text-base font-medium text-white  hover:underline  cursor-pointer "
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
