"use client";

import { LocaleKeysType } from "@/app/i18n";
import { useTranslation } from "@/app/i18n/client";
import { useCallback, useState } from "react";
import { PiEyesFill } from "react-icons/pi";
import { HiEyeSlash } from "react-icons/hi2";
import { FaCircleDot } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";

interface PasswordValidateProps {
    strengthValid: boolean;
    upperCaseValid: boolean;
    numberValid: boolean;
    specialCharValid: boolean;
}

const ValidateButton = ({content,valid}:{content:string; valid: boolean}) => {
    return (
        <button className={`${valid? "bg-primaryColor text-secondaryColor":"bg-dark/40 text-dark/20 "} border-none rounded-full py-1 px-2 flex gap-1 items-center text-xs`}>
            {valid ? <BsCheckCircleFill /> : <FaCircleDot />}
            {content}
        </button>
    );
}

export const PasswordInput = ({lang}:{lang:LocaleKeysType}) => {
    const {translate:t} = useTranslation(lang);
    const [formValue, setFormValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formValidation, setFormValidation] = useState<PasswordValidateProps>({
        strengthValid: false,
        upperCaseValid: false,
        numberValid: false,
        specialCharValid: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormValue(value);
        setFormValidation({
            strengthValid: value.length >= 8,
            upperCaseValid: /[A-Z]/.test(value),
            numberValid: /[0-9]/.test(value),
            specialCharValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
        });
    };

    const isFormValid = useCallback(() => {
        return Object.values(formValidation).every((value) => value === true);
    }, [formValidation]);

    return (
        <div className="w-full p-4 flex flex-col justify-center h-full">
            <label htmlFor="" className="text-secondaryColor">{t("examples.password")}</label>
            <div className="relative mt-2">
                <input 
                    type={showPassword ? "text":"password"} 
                    onChange={handleInputChange}
                    value={formValue}
                    className="border-secondaryColor border focus:border-primaryColor focus:outline-primaryColor rounded-xl text-secondaryColor text-lg w-full px-8 py-2"
                    />
                <button 
                    className="absolute top-1/2 -translate-y-1/2 right-6 text-lg text-secondaryColor"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <HiEyeSlash /> : <PiEyesFill />}
                </button>
            </div>
            <div className="flex gap-3 w-full mt-2">
               <ValidateButton content={t("examples.lengthValid")} valid={formValidation.strengthValid}/>
                <ValidateButton content={t("examples.upperValid")} valid={formValidation.upperCaseValid}/>
                <ValidateButton content={t("examples.numberValid")} valid={formValidation.numberValid}/>
                <ValidateButton content={t("examples.specialValid")} valid={formValidation.specialCharValid}/>
            </div>
            <div className="flex w-full justify-end mt-6">
                <button className={`px-4 py-2 ${isFormValid() ? "bg-secondaryColor hover:bg-secondaryColor/70":"bg-dark/10 text-dark/30"} text-white rounded-full`}>
                    {t("examples.createUser")}
                </button>
            </div>
        </div>
    );
}