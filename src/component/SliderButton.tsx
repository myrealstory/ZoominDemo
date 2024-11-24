
import { dayLeft } from "@/utils/helper";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface SliderButtonProps {
    date:string;
    height:string;
    width:string;
    id:string;
}

export const SliderButton = ({
    date,height,width,id
}:SliderButtonProps) => {
    const {t} = useTranslation();
    const [hover, setHover] = useState<string | null>(null);
    const sliderButtonRef = useRef<HTMLDivElement>(null);
    const [buttonHeight, setButtonHeight] = useState<number>(0);
  
    const status = dayLeft(date, t).status; // Pre-calculate status
    const message = dayLeft(date, t).message; // Pre-calculate message

     // Set the height after the component mounts
  useEffect(() => {
    if (sliderButtonRef.current) {
      setButtonHeight(sliderButtonRef.current.offsetHeight);
    }
  }, [sliderButtonRef]);

    return (
        <div className={`${height} ${width} 
        ${status === "today" ? "bg-brighterRed text-white border-secondaryRed":
            status === "past" ? "bg-brighterGreen text-header/60 border-secondaryGreen":
            "bg-white text-header border-header" } overflow-hidden border border-solid rounded-xl z-50 px-2 cursor-pointer`} 
        style={{height:height}}
        onMouseEnter={()=>setHover(id)}
        onMouseLeave={()=>setHover(null)}
        ref={sliderButtonRef}
        >
            <div className="duration-500 transform text-center" 
            style={{transform: hover === id ? `translateY(-${buttonHeight}px)` : "translateY(1px)"}}>
                <p className={`text-nowrap text-xs ${height}`}>{date}</p>
                <p className={`text-nowrap text-xs ${height}`}>{message}</p>
            </div>
        </div>
    )
}