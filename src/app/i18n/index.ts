import i18next, {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

type LocaleKeysType = "en" | "tc";

const locales: LocaleKeysType[] = ["en", "tc"];
const defaultLocale: LocaleKeysType = "en";
const cookieName = "lang";
const defaultNameSpace = "main";
const LANGUAGE = {
    EN: "en" as const ,
    TC: "tc" as const
}

const getOption = (lang : LocaleKeysType = defaultLocale, namespace = defaultNameSpace) => {
    return {
        lng: lang,
        ns: namespace,
        defaultNS: defaultNameSpace,
        fallbackLng: defaultLocale,
        supportedLngs: locales,
        fallbackNS:defaultNameSpace,
        interpolation: {
            escapeValue: false,
          }
    };
};

const initI18next = async (lang: LocaleKeysType, namespace?: string) => {
    if (i18next.isInitialized) {
      return i18next;
    }
    await i18next
      .use(initReactI18next)
      .use(resourcesToBackend((lng: string, ns: string) => import(`./${lng}/${ns}.json`)))
      .init(getOption(lang, namespace));
    return i18next;
  };

const useTranslation = async (lang: LocaleKeysType, namespace? : string, option?: {keyPrefix: string}) => {
    const i18nextInstance = await initI18next(lang, namespace);
    return {
        translate: i18nextInstance.getFixedT(lang, namespace, option?.keyPrefix),
        i18n: i18nextInstance,
    }
}

export {locales, defaultLocale, cookieName, useTranslation,getOption,LANGUAGE};
export type {LocaleKeysType};