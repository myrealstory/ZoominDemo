import { useState, useEffect } from "react";
import { throttle } from "lodash";

interface WindowSizeProps {
  width: number;
  height: number;
  scrollY: number;
  isWindowReady: boolean;
  isAppear: boolean;
  scrollUP: boolean;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: 0,
    height: 0,
    scrollY: 0,
    isWindowReady: false,
    isAppear: true,
    scrollUP: false,
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setWindowSize((prev) => ({
        ...prev,
        scrollY: window.scrollY,
      }));
    }, 100);

    const handleSize = () => {
      if (window.visualViewport) {
        setWindowSize((prev) => ({
          ...prev,
          width: window.visualViewport ? window.visualViewport.width : window.innerWidth,
          height: window.visualViewport ? window.visualViewport.height : window.innerHeight,
          isWindowReady: true,
        }));
      } else {
        setWindowSize((prev) => ({
          ...prev,
          width: window.innerWidth,
          height: window.innerHeight,
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
      };
    }
  }, []);

  return windowSize;
};
