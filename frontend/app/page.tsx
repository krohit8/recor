import { Appbar, NavbarDemo } from "@/components/navbar";
import { SignUpButton } from "@/components/SignupButton";
import { SpotlightPreview } from "@/components/Spotlight";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavbarDemo  />
      <SpotlightPreview />
     
    </div>
  );
}
