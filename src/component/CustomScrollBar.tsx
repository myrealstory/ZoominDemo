import React, { useCallback, useRef } from "react";

interface CustomScrollBarProps {
    children: React.ReactNode;
    maskingHeight: number;
    customClass?: string;
    wheelSize?: number;
    scrollBarSize?: number;
    setChildHeight: (height: number) => void;
}


export const CustomScrollBar = ({
    children,
    maskingHeight,
    customClass,
    scrollBarSize,
    wheelSize,
    setChildHeight,
}:CustomScrollBarProps) => {
    const [currentY, setCurrentY] = React.useState(0);
    const [childrenHeight, setChildrenHeight] = React.useState(0);
    const [wheelY, setWheelY] = React.useState(0);  
    const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
    const startYRef = useRef(0);
    const startScrollRef = useRef(0);
    const isDraggingRef = useRef(false);

    const maxScroll = Math.max(0, childrenHeight - maskingHeight);
    const maxWheelY = maskingHeight - Math.floor((maskingHeight/childrenHeight)*maskingHeight);

    const childrenRef = useCallback((node: HTMLDivElement) => {
        if(node !== null){
            setChildrenHeight(node.clientHeight);
            setChildHeight(node.clientHeight);
        }
        setRef(node);
    }, []);

    const handleWheel = (e: WheelEvent) => {
        if(!ref) return;
        e.preventDefault();

        const scrollSensitive = 0.5;
        const delta = e.deltaY * scrollSensitive;
        const newScroll = Math.min(Math.max(currentY - delta, -maxScroll),0);
        setCurrentY(newScroll);

        const newWheelY = Math.min(Math.max((-newScroll / maxScroll) * maxWheelY, 0), maxWheelY);
        setWheelY(newWheelY);
    }

   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startScrollRef.current = wheelY;

    document.body.style.userSelect = "none";

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

   }

   const handleMouseMove = (e: MouseEvent) => {
        if(!isDraggingRef.current) return;

        const deltaY = e.clientY - startYRef.current;
        // const invertedDeltaY = -deltaY;
        const maxWheelY = maskingHeight - Math.floor((maskingHeight/childrenHeight)*maskingHeight);
        const newWheelY = Math.min(Math.max(startScrollRef.current + deltaY, 0), maxWheelY);
        setWheelY(newWheelY);

        const newScroll = -Math.min((newWheelY / maxWheelY) * maxScroll, maxScroll);

        setCurrentY(newScroll);
    }

    const handleMouseUp = () => {
        isDraggingRef.current = false;

        document.body.style.userSelect = "auto";

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    React.useEffect(() => {
        if(ref){
            ref.addEventListener("wheel", handleWheel, { passive: false});
        }
        return ()=> {
            if(ref){
                ref.removeEventListener("wheel", handleWheel);
            }
        };
    },[ref, childrenRef, maskingHeight, currentY]);

    return(
        <div 
            className={`overflow-y-hidden w-full relative ${customClass}`} 
            style={{height:maskingHeight}}>
            <div 
                className="w-full h-auto transform" 
                style={{transform:`translateY(${currentY}px)`}}
                ref={childrenRef}
                >
                    {children}
            </div>
            <div 
                className="absolute top-1/2 -translate-y-1/2 right-2 bg-secondaryRed flex justify-center" 
                style={{
                    height: maskingHeight-16,
                    width: scrollBarSize,
                }}
            >
                <div 
                id="scrollWheel"
                    className="flex-shrink-0 rounded-xl bg-secondary cursor-pointer"
                    style={{
                        height: Math.floor((maskingHeight/childrenHeight)*100), width:wheelSize,
                        transform: `translateY(${wheelY}px)`,
                    }}
                    onMouseDown={handleMouseDown}

                    />
            </div>
        </div>
    )
}