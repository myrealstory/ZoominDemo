"use client";
import React, {useEffect,useRef,useState} from "react";
import Image from "next/image";
import firstBG from "@/images/10199671.png";
import backBG from "@/images/8545046.jpg";

export default function Home() {

  const [scrollY,setScrollY] = useState(0);

  const [scale, setScale] = useState(1);
  const [bgScale, setBGScale] = useState(1);
  const [blur, setBlur] = useState(0);
  //因為用來記錄目前scroll的位置，所以是number
  const currentScaleSize = useRef<number|null>(null);

  useEffect(()=>{
    //如果 window 還沒有準備好就不做這樣的操作
    if (typeof window !== "undefined") {
      const handleScroll = () => {

        setScrollY(window.scrollY);

        // 150 是 scrolling 的速度 / 比例
        const scaleValue = 1 + (window.scrollY / 150);

        // 當 scrollY 的 高度到了一定的高度以後，才會被定格。不然繼續 1 + scroll 的 比例
        const bgScaleValue = window.scrollY >= 1138 ? currentScaleSize.current ?? 0 : 1 + (window.scrollY / 5000);

        // setState 反饋給 Dom
        setScale(scaleValue);
        setBGScale(bgScaleValue);
        // 1 太糊了，所以 -1 ， 景深控制
        setBlur(scaleValue - 1);

        // 使用 useRef 來記錄 bgScaleValue 的值，useRef 可以即時紀錄並且不會因為rendering 而被重置
        currentScaleSize.current = bgScaleValue;
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
      <div className={`fixed top-0 left-0 w-full h-full z-50`} style={{transform :`scale(${scale})`, filter:`blur(${blur}px)`}} >
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
