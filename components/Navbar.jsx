"use client"

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity , BriefcaseMedical } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarItem } from "./ui/menubar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <Link href="/">
              <img src="/img/logo.jpg" alt="Logo" className="h-20" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-500 rounded-full border border-blue-500 px-4 py-2">Home</a>
            <a href="/#about" className="text-gray-700 hover:text-blue-500 rounded-full border border-blue-500 px-4 py-2">About</a>
            <a href="/#reviews" className="text-gray-700 hover:text-blue-500 rounded-full border border-blue-500 px-4 py-2">Services</a>
            <a href="/#contact" className="text-gray-700 hover:text-blue-500 rounded-full border border-blue-500 px-4 py-2">Contact</a>
            <div className="flex space-x-4">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Login</MenubarTrigger>
                  <MenubarContent>
                    <MenubarRadioGroup >
                      <MenubarRadioItem className="pl-3" value="doctor" onClick={() => router.push("/doctor/signin")}>
                        <BriefcaseMedical className="w-4 h-4 mr-2" />
                          Doctor
                      </MenubarRadioItem>
                      <MenubarRadioItem className="pl-3" value="patient" onClick={() => router.push("/patient/signin")}>
                        <Activity className="w-4 h-4 mr-2" />
                        Patient
                      </MenubarRadioItem>
                    </MenubarRadioGroup>
                    {/* <MenubarSeparator />
                    <MenubarItem inset>Edit...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Add Profile...</MenubarItem> */}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-3">
          <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Home</a>
          <a href="/#about" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">About</a>
          <a href="/#reviews" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Services</a>
          <a href="/#contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Contact</a>
          <div className="flex space-x-4 px-4 py-2">
              <Menubar className="rounded-full border border-blue-500 py-4">
                <MenubarMenu>
                  <MenubarTrigger>Login</MenubarTrigger>
                  <MenubarContent>
                    <MenubarRadioGroup >
                      <MenubarRadioItem className="pl-3" value="doctor" onClick={() =>{
                        router.push("/doctor/signin");
                        setIsOpen(false);
                      }}>
                        <BriefcaseMedical className="w-4 h-4 mr-2" />
                          Doctor
                      </MenubarRadioItem>
                      <MenubarRadioItem className="pl-3" value="patient" onClick={() =>{
                        router.push("/patient/signin");
                        setIsOpen(false);
                      }}>
                        <Activity className="w-4 h-4 mr-2" />
                        Patient
                      </MenubarRadioItem>
                    </MenubarRadioGroup>
                    {/* <MenubarSeparator />
                    <MenubarItem inset>Edit...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Add Profile...</MenubarItem> */}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
