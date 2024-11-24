import { useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface ToolTipsButtonProps {
  title?: string;
  onClick: () => void;
  type: "submit" | "reset" | "button" | undefined;
  customClass?: string;
  tooltipsContent?: JSX.Element;
  disabled?: boolean;
  icon?: string;
  iconJSX?: JSX.Element;
}

export const ToolTipsButton = ({
  title,
  onClick,
  type,
  customClass,
  tooltipsContent,
  disabled,
  icon,
  iconJSX,
}: ToolTipsButtonProps) => {
  const [trigger, setTrigger] = useState(false);

  return (
    <div className="relative">
      {trigger && tooltipsContent && (
        <div className="absolute -top-[36px] left-1/2 -translate-x-1/2 bg-darkBlue p-2 box-content text-nowrap rounded-md text-xs text-white">
          <TbTriangleInvertedFilled className="text-darkBlue absolute -bottom-2 left-1/2 -translate-x-1/2" />
          {tooltipsContent}
        </div>
      )}
      <button
        className={`${
          disabled ? "disableBTN" : customClass ? customClass : ""
        } miniBTN flex items-center justify-center gap-2`}
        onClick={onClick}
        type={type}
        disabled={disabled}
        onMouseEnter={() => setTrigger(true)}
        onMouseLeave={() => setTrigger(false)}
      >
        {icon && <img src={icon} alt="icon" className="me-2" />}
        {iconJSX && iconJSX}
        {title}
      </button>
    </div>
  );
};
