"use client";
import { useTranslation } from "@/app/i18n/client";
import { FaMobileScreen } from "react-icons/fa6";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsThreadsFill } from "react-icons/bs";
import { LuCakeSlice } from "react-icons/lu";
import { GrDocumentPdf } from "react-icons/gr";
import { LocaleKeysType } from "@/app/i18n";

export const PersonalInfo = (lang:LocaleKeysType) => {
    const {translate:t} = useTranslation(lang);
    const info = [
        {
            id:1,
            icon:FaMobileScreen,
            text:"+886-979069676",
        },
        {
            id:2,
            icon:MdOutlineAttachEmail,
            text:"seednaruto123@gmail.com",
        },
        {
            id:3,
            icon:FaLocationDot,
            text:t("profile.location"),
        },
        {
            id:4,
            icon:BsThreadsFill,
            text:"chung_zai61",
            link:"https://www.threads.net/@chung_zai61",
        },
        {
            id:5,
            icon:LuCakeSlice,
            text:"my cake resume",
            link:"https://www.cake.me/Gordon0601",
        },
        {
            id:6,
            icon:GrDocumentPdf,
            text:"TW 104 Resume",
            link:"https://pda.104.com.tw/profile/preview?vno=74rk3wa0w",
        },
    ];
    return info;
}