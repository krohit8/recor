"use client";
import React from "react";
import { Button } from "../components/ui/moving-border";
import { useRouter } from "next/navigation";
export function SignUpButton() {
    const router = useRouter()
  return (
    <div  onClick={() => {router.push("/signup")}} className="p-0 m-0 flex items-center justify-center">
      <Button
        borderRadius="1.75rem"
        className="bg-white text-xl font-bold dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Sign Up 
      </Button>
    </div>
  );
}
