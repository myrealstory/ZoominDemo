"use client";

import i18next from 'i18next';
import {initReactI18next, useTranslation as useTranslationOrg} from "react-i18next";
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import { LocaleKeysType,  getOption } from '.';
import { use } from 'react';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend((lng:string, ns:string)=>
    import(`./${lng}/${ns}.json`)))
    .init({
        ...getOption(),
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie']
        }
    });

const useTranslation = (lang: LocaleKeysType, namespace? : string, option?: {keyPrefix: string}) => {
    if(i18next.resolvedLanguage !== lang){
        i18next.changeLanguage(lang);
    }
    const { t: translate, i18n} = useTranslationOrg(namespace, option);
    return {
        translate,
        i18n,
    }
}

export {useTranslation};
