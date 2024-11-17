"use client";
import { LocaleKeysType } from "@/app/i18n";
import { useTranslation } from "@/app/i18n/client";
import { Upload } from "./Upload";
import { PasswordInput } from "./PasswordInput";
import { DataAnalysis } from "./DataAnalysis";

export const Example = ({ lang }: { lang: LocaleKeysType }) => {
  const { translate: t } = useTranslation(lang);
  return (
    <div className="mt-4">
      <div className="bg-primaryColor text-secondaryColor py-2 px-6">
        <h3 className="text-3xl font-semibold">{t("examples.title")}</h3>
        <p className="text-sm">{t("examples.content")}</p>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="w-full h-full border-primaryColor border col-span-2 lg:col-span-1">
          <Upload lang={lang} />
        </div>
        <div className="w-full border-primaryColor border col-span-2 lg:col-span-1">
          <PasswordInput lang={lang} />
        </div>
        <div className="col-span-2 w-full border-primaryColor border">
          <div className="bg-primaryColor py-2 px-6">
            <p className="text-secondaryColor text-sm">
              {t("examples.dataContent")}
            </p>
          </div>
          <DataAnalysis lang={lang} />
        </div>
      </div>
      <div className="bg-primaryColor text-secondaryColor text-sm py-3 text-center">
        <p>{t("examples.endContent")}</p>
      </div>
    </div>
  );
};
