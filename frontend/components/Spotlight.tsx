import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../components/ui/Spotlight";
import { SignUpButton } from "./SignupButton";

export function SpotlightPreview() {
  return (
    <div className="h-screen pt-20  w-full rounded-md flex md:items-center md:justify-center dark:bg-black/[0.96] antialiased dark:bg-grid-white/[0.02] bg-white relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="red"
      />
      <div className="   max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-2xl md:text-4xl font-bold text-center bg-clip-text dark:text-white text-black">
          Welcome to <br />
        </h1>
        <h1 className="text-9xl md:text-9xl font-extrabold text-center bg-clip-text    dark:text-red-700 text-customRed ">
            Recor
        </h1>
        <br/>
        <p className="mt-4 font-normal text-base dark:text-white text-slate-900 max-w-lg text-center mx-auto">
         A record of your expenses.
         <br/>
          Keep your expenses in check with us
        </p>
        <div className="flex items-center justify-center m-0 p-0  mt-16">
          <SignUpButton/>
      </div>
      </div>
    
    </div>
  );
}
