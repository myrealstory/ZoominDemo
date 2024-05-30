"use client";
import React, {useEffect,useState} from "react";
import Image from "next/image";
import firstBG from "@/images/10199671.png";
import backBG from "@/images/8545046.jpg";
import { useWindowSize } from "@/component/useWindowSize";

export default function Home() {

  const [scrollY,setScrollY] = useState(0);

  const [scale, setScale] = useState(1);
  const [bgScale, setBGScale] = useState(1);

  useEffect(()=>{
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollY(window.scrollY);
        const scaleValue = 1 + (window.scrollY / 150);
        const bgScaleValue = window.scrollY >= 1138 ? 1.2276 : 1 + (window.scrollY / 5000);
        setScale(scaleValue);
        setBGScale(bgScaleValue);
        console.log("Scrolling: ", window.scrollY); // Debug: Check if scroll is detected
      };

      window.addEventListener("scroll", handleScroll);

      // Initial scale set
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

  },[]);

  return (
    <main className="h-full w-full">
      <div className={`fixed top-0 left-0 w-full h-full z-50`} style={{transform :`scale(${scale})`}}>
        <Image
          src={firstBG}
          alt="hero image"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full h-[3000px] flex justify-center"> 
        <div className={`sticky top-10 left-0 h-[800px] w-auto`} style={{transform:`scale(${bgScale})`}}>
          <Image
            src={backBG}
            alt="back image"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
