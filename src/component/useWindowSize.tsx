"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface WindowSizeProps {
  width: number;
  height: number;
  scrollY: number;
  isWindowReady: boolean;
  isAppear: boolean;
}


export const useWindowSize = () => {
  const path = usePathname();
  let isForceHiddenPage = false;

  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: 0,
    height: 0,
    scrollY: 0,
    isWindowReady: false,
    isAppear: isForceHiddenPage ? false : true,
  });
  const lastScrollLocation = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // const debounce = (func: (...args: any[]) => void, wait: number) => {
    //   let timeout: NodeJS.Timeout | null = null;

    //   return function executedFunction(...args: any[]) {
    //     const later = () => {
    //       clearTimeout(timeout!);
    //       func(...args);
    //     };

    //     clearTimeout(timeout!);
    //     timeout = setTimeout(later, wait);
    //   };
    // };

    const handleScroll = () => {

      if (lastScrollLocation.current >= window.scrollY || window.scrollY <= 0) {  // scrolling up keep display
        setWindowSize((prevWindowSize) => ({
          ...prevWindowSize,
          scrollY: window.scrollY,
          isAppear: isForceHiddenPage ? false : true,
        }));
      } else {
        setWindowSize((prevWindowSize) => ({  // scrolling down hidd
          ...prevWindowSize,
          scrollY: window.scrollY,
          isAppear: false,
        }));
      }
      lastScrollLocation.current = window.scrollY;

      clearTimeout(scrollTimeoutRef.current!);
      scrollTimeoutRef.current = setTimeout(() => {  // stop scrolling display
        setWindowSize((prevWindowSize) => ({
          ...prevWindowSize,
          isAppear: isForceHiddenPage ? false : true,
        }));
      }, 200);
    };

    const handleSize = () => {
      if (window.visualViewport) {
        setWindowSize((prevWindowSize) => ({
          ...prevWindowSize,
          width: window?.visualViewport?.width ?? 0,
          height: window?.visualViewport?.height ?? 0,
          scrollY: window.scrollY,
          isWindowReady: true,
        }));
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleSize);
      window.addEventListener("scroll", handleScroll);
      handleSize();

      return () => {
        window.removeEventListener("resize", handleSize);
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeoutRef.current!);
      };
    }
  }, []);

  /*
  useEffect(() => {
    const debounce = (func: (...args:FunctionArgs )=> void, wait:number):DebouncedFunction =>{
      let timeout : ReturnType<typeof setTimeout> | null = null;
      return function executedFunction(...args:FunctionArgs){
        const later =() =>{
          clearTimeout(timeout!);
          func(...args);
        };
        clearTimeout(timeout!);
        timeout = setTimeout(later,wait);
      };
    }

    const handleScroll = debounce(()=>{
      setWindowSize(prevWindowSize => ({
        ...prevWindowSize,
        scrollY: window.scrollY,
        isAppear: (window.scrollY - 10) <= lastScrollLocation.current,
      }));
      lastScrollLocation.current = window.scrollY + 5;
      // 10 & 5 range to make it not more sensitive
    }, 100)

    const handleSize = () => {
      if (window.visualViewport) {
        setWindowSize({
          width: window.visualViewport.width,
          height: window.visualViewport.height,
          scrollY: window.scrollY,
          isWindowReady: true,
          isAppear: window.scrollY == 0 ? true : window.scrollY < lastScrollLocation.current,
        });
      }
    };

    // const stopHandleScroll = () =>{
    //   if(timer !== null) clearTimeout(timer);
    //   timer = setTimeout(()=>{
    //     setWindowSize(preWindowSize => ({
    //       ...preWindowSize,
    //       isAppear: true,
    //     }));
    //   },200);
    // }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleSize);
      window.addEventListener("scroll", handleScroll)
      // window.addEventListener("scroll",stopHandleScroll,false)
      handleSize();

      return () => {
        window.removeEventListener("resize", handleSize);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  */
  
  return windowSize;
};