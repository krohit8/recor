"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import recor from "../app/recor.png";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";
import { ButtonWithIcon } from "./ui/Login";
import {useRouter} from "next/navigation"

export function NavbarDemo() {

  return (
    <div className="relative w-full  flex items-center justify-center ">
      <Navbar className="top-4   max-w-screen-lg" />
      
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const router = useRouter()
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}
    >
      <Menu setActive={setActive}>
        <div className="flex items-center  justify-start  ">
          <Avatar className="mr-4">
            <AvatarImage src={recor.src} alt="Home Avatar" />
            <AvatarFallback>HOME</AvatarFallback>
          </Avatar>
          <div  onClick={() => {router.push("/")}}  className="cursor-pointer">
          <h1 className="text-red-500 font-bold p-0 m-0 pb-2  pl-0 ml-0 text-4xl" >
            Recor
          </h1>
         
          </div>
        </div>
        <div className="flex items-center justify-end w-full space-x-5  ">
          <ModeToggle  />
          <ButtonWithIcon/>
        </div>
      </Menu>
      
    </div>
  );
}
