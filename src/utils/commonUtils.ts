import { defaultLocale, LocaleKeysType, locales } from "@/app/i18n";

const getLangFromString = (str: string) => {
    const regex = /\/(\w+)/g;
    const matches = str.matchAll(regex);
    let lang = defaultLocale;
    for (const match of matches) {
      if (locales.indexOf(match[1] as LocaleKeysType) > -1) {
        lang = match[1] as LocaleKeysType;
      }
    }
    return lang;
  };

  export { getLangFromString};
  