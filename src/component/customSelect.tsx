"use client";
import { LocaleKeysType } from "@/app/i18n";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export interface selectOption {
  // label: number;
  label: string | number;
  value: string;
  name?: string;
}

interface CustomSelectProps {
  options?: selectOption[];
  onChange?: (value: string) => void;
  onChangeById?: (id: number) => void;
  label?: string;
  firstOption?: string;
  value?: string;
  valueById?: number;
  disabled?: boolean;
  error?: string;
  allowEmpty?: boolean;
  className?: string; // Container class
  labelClassName?: string;
  selectClassName?: string; // select class
  errorClassName?: string;
  onBlur?: () => void;
  tabsDisplay?: JSX.Element;
  renderOptions?: () => JSX.Element[];
  defaultValue?: boolean;
  lang: LocaleKeysType;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  firstOption,
  value,
  valueById,
  onChange,
  onChangeById,
  disabled = false,
  error,
  allowEmpty = true,
  className = "",
  labelClassName = "mb-1",
  selectClassName,
  errorClassName = "text-start text-red-500 text-sm mt-1",
  tabsDisplay,
  renderOptions,
  defaultValue,
  lang,
}) => {
  const { t } = useTranslation(lang);
  const [trigger, setTrigger] = React.useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedValue, setSelectedValue] = React.useState<string | number | undefined>(value || valueById);

  //find the label that corresponds to the default value if provided
  useEffect(() => {
    if (defaultValue && options) {
      if (value) {
        const selectedOption = options.find((option) => option.value.includes(value));
        if (selectedOption) {
          setSelectedValue(selectedOption.label);
        }
      }
      if (valueById) {
        const selectedOption = options.find((option) => option.label === valueById);
        if (selectedOption) {
          setSelectedValue(selectedOption.label);
        }
      }
    }
  }, [defaultValue, options, value, valueById]);

  return (
    <div className={`relative flex flex-col custom-Select ${className}`}>
      {label && (
        <div className="flex justify-start items-center">
          <label className={labelClassName}>{t(label)}</label>
        </div>
      )}
      <div className={`${disabled ? "border-lightGray text-lightGray" : ""} ${selectClassName} relative flex justify-start w-full `}>
        <select
          ref={selectRef}
          value={selectedValue}
          onChange={(e) => {
            const getID = parseInt(e.target.value);
            const selectedValue = e.target.value;
            setSelectedValue(selectedValue);
            if (onChange) {
              onChange(selectedValue);
            }

            if (onChangeById) {
              onChangeById(getID);
            }
          }}
          onClick={() => setTrigger(!trigger)}
          onBlur={() => {
            setTrigger(false);
            setSelectedValue(undefined);
          }}
          disabled={disabled}
          className={`${disabled ? "!bg-dark/10 !border-dark/30 !text-dark/50 cursor-not-allowed" : ""}`}>
          {allowEmpty && <option value="">{firstOption ? firstOption : t("selectAnOption")}</option>}

          {renderOptions && renderOptions()}

          {options &&
            options.map((option) => (
              <option key={option.label} value={option.label}>
                {option.name ? option.name : option.value}
              </option>
            ))}
        </select>
        <div className={`absolute text-sm bottom-[10px] right-4 ${disabled? "text-dark/50":""}`}>{trigger === true ? <FaChevronUp /> : <FaChevronDown />}</div>
      </div>
      {tabsDisplay && tabsDisplay}
      {error && <p className={errorClassName}>{error}</p>}
    </div>
  );
};

export default CustomSelect;
