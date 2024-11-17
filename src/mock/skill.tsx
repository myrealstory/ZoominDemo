"use client";
import { LocaleKeysType } from "@/app/i18n";
import { useTranslation } from "@/app/i18n/client";
import ReactIcon from "@/images/React-icon.svg.png";
import NextjsIcon from "@/images/nextjs.svg";
import NodejsIcon from "@/images/nodejs.png";
import NestjsIcon from "@/images/nestjs_logo_icon_169927.svg";
import TailwindIcon from "@/images/tailwindcss.svg";
import TypescriptIcon from "@/images/typescript.png";
import reduxIcon from "@/images/redux.png";


export const SkillList = (lang:LocaleKeysType) =>{
    const {translate:t} = useTranslation(lang);

    const skills = [
        {
            id:1,
            name:"React",
            icon:ReactIcon,
            hoverText: t("skill.text1")
        },
        {
            id:2,
            name:"Nextjs",
            icon:NextjsIcon,
            hoverText: t("skill.text2")
        },
        {
            id:3,
            name:"Tailwindcss",
            icon:TailwindIcon,
            hoverText: t("skill.text3")
        },
        {
            id:4,
            name:"TS",
            icon:TypescriptIcon,
            hoverText: t("skill.text4")
        },
        {
            id:5,
            name:"Redux",
            icon:reduxIcon,
            hoverText: t("skill.text5")
        },
        {
            id:6,
            name:"NestJs",
            icon:NestjsIcon,
            hoverText: t("skill.text6")
        },
        {
            id:7,
            name:"Nodejs",
            icon:NodejsIcon,
            hoverText: t("skill.text7")
        },
    ];

    return skills;
} 