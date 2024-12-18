"use client";
import { LocaleKeysType } from "@/app/i18n";
import { set } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { CustomScrollBar } from "./CustomScrollBar";

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
  allowEmpty?: string | number | undefined;
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

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  firstOption,
  value,
  valueById,
  onChange,
  onChangeById,
  disabled = false,
  error,
  allowEmpty,
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
  const [selectHeight, setSelectHeight] = React.useState(0);
  const [childrenHeight, setChildrenHeight] = React.useState(0);
  const [selectedValue, setSelectedValue] = React.useState<
    string | number | undefined
  >(value || valueById);

  //find the label that corresponds to the default value if provided
  useEffect(() => {
    if (defaultValue && options) {
      if (value) {
        const selectedOption = options.find((option) =>
          option.value.includes(value)
        );
        if (selectedOption) {
          setSelectedValue(selectedOption.label);
        }
      }
      if (valueById) {
        const selectedOption = options.find(
          (option) => option.label === valueById
        );
        if (selectedOption) {
          setSelectedValue(selectedOption.label);
        }
      }
    }
  }, [defaultValue, options, value, valueById]);

  const handleSelectedValue = (value: number | string) => {
    if (typeof value === "number") {
      const selectedOption = options?.find((option) => option.label === value);
      if (selectedOption) {
        const [en, zh] = selectedOption.value.split("|");
        setSelectedValue(lang === "en" ? en : zh);
      }
    }
    if (typeof value === "string") {
      const selectedOption = options?.find((option) =>
        option.value.includes(value)
      );
      if (selectedOption) {
        const [en, zh] = selectedOption.value.split("|");
        setSelectedValue(lang === "en" ? en : zh);
      }
    }
  };

  const selectRef = useCallback((node: HTMLButtonElement | null) => {
    if (node !== null) {
      setSelectHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const maskingHeight = useMemo(() => {
    if(childrenHeight === 0) return 0;
    if(childrenHeight < 150) return childrenHeight;
    return 150;
  },[options]);

  return (
    <div className={`relative flex flex-col custom-Select ${className}`}>
      {label && (
        <div className="flex justify-start items-center">
          <label className={labelClassName}>{t(label)}</label>
        </div>
      )}
      <div
        className={`${
          disabled ? "border-lightGray text-lightGray" : ""
        } ${selectClassName} relative flex justify-start w-full`}
      >
        <button
          ref={selectRef}
          onClick={() => setTrigger(!trigger)}
          disabled={disabled}
          className={`${
            disabled
              ? "!bg-dark/10 !border-dark/30 !text-dark/50 cursor-not-allowed"
              : ""
          } relative border-secondaryColor border border-solid rounded-full text-left xl:pl-5 md:pl-4 pl-2 py-1 w-full`}
        >
          {selectedValue ||
            (allowEmpty
              ? firstOption || "Select an option"
              : "Select an option")}
        </button>
        <div
          className="absolute left-1/2 -translate-x-1/2 duration-300 transform origin-top bg-white w-full overflow-hidden rounded-xl border-secondaryColor h-full"
          style={{
            maxHeight: trigger ? 150 : 0,
            top: 0,
            borderWidth: trigger ? 1 : 0,
            zIndex: trigger ? 10 : 0,
          }}
        >
          <CustomScrollBar
            maskingHeight={maskingHeight}
            customClass="w-full"
            scrollBarSize={1}
            wheelSize={6}
            setChildHeight={setChildrenHeight}
          >
            {options?.map((option) => (
              <button
                className={`custom-Select-button`}
                key={option.label}
                onClick={() => {
                  handleSelectedValue(option.label);
                  if (onChange) {
                    onChange(option.value);
                  }
                  if (onChangeById) {
                    onChangeById(option.label as number);
                  }
                  setTrigger(false);
                }}
              >
                {option.name ? option.name : option.value}
              </button>
            ))}
          </CustomScrollBar>
        </div>
        <div
          className={`absolute text-sm bottom-[10px] right-4 ${
            disabled ? "text-dark/50" : ""
          }`}
        >
          {trigger === true ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {tabsDisplay && tabsDisplay}
      {error && <p className={errorClassName}>{error}</p>}
    </div>
  );
};
