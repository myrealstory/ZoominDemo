"use client";
import { bannerProps } from "@/type/banner";
import { useMemo, useState } from "react";
import { SliderButton } from "../SliderButton";
import { useTranslation } from "@/app/i18n/client";
import { LocaleKeysType } from "@/app/i18n";
import { ToolTipsButton } from "../ToolTipsButton";
import { FaEdit, FaTrashAlt, FaExchangeAlt } from "react-icons/fa";

export const BannerComponent = ({data, index,lang}:{data: bannerProps;index:number;lang:LocaleKeysType}) => {

    const types = JSON.parse(data.banner_type);
    const [countryEn, countryZh] = data.country.split("|");

    const openImage = (url: string) => {
        window.open(url, "_blank");
    };

    const [hoverBanner, setHoverBanner] = useState<string | null>(null);
    const {translate: t} = useTranslation(lang);

    const dateArray = useMemo(() => {
        const today = new Date();
    
        // Create the three dates
        const future30Days = new Date(today);
        future30Days.setDate(today.getDate() + 30);
    
        const past10Days = new Date(today);
        past10Days.setDate(today.getDate() - 10);
    
        // Push them into an array
        return [
          future30Days.toISOString().split("T")[0], // Convert to YYYY-MM-DD
          today.toISOString().split("T")[0],
          past10Days.toISOString().split("T")[0],
        ];
      }, []);
    

    return (
        <div
          className={`h-full flex flex-col justify-between `}
          key={data.banner_id}
          onMouseEnter={() => setHoverBanner(data.banner_id)}
          onMouseLeave={() => setHoverBanner(null)}
        >
          <div className={`relative w-full h-[13rem]`}>
            <div className="absolute left-2 top-2">
              <SliderButton
                date={dateArray[index]}
                height="h-5"
                width="w-fit"
                id={data.banner_id as string}
              />
            </div>
            <img
              src={data.banner_photo as string}
              alt=""
              className={`w-full h-full object-cover rounded-lg box-border  ${data.banner_id === hoverBanner ? data.status === 1 ? "lg:border-secondaryBlue lg:border-2 ":"lg:border-secondaryRed lg:border-2" : ""}`}
              onClick={() => openImage(data.banner_url)}
            />
            <div
              className={`absolute top-2 right-2 text-xs px-3 py-0.5 rounded-full ${
                data.status === 1
                  ? " bg-blue200 text-secondaryBlue"
                  : " bg-pink200 text-secondaryRed"
              }`}
            >
              {data.status === 1
                ? t("examples.banner.published")
                : t("examples.banner.unpublished")}
            </div>
            <div className="flex gap-1 absolute left-2 bottom-2">
              <p className="rounded-full border-secondary bg-primary border-solid border text-white text-xs text-center p-1 mr-1">
                {lang === "en" ? countryEn : countryZh}
              </p>
              {types.map((type: string, index: number) => (
                <p
                  key={index}
                  className="rounded-full border-offStatus bg-contentBG border-solid border text-offStatus text-xs text-center flex items-center px-2"
                >
                  {type}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-around">
            <ToolTipsButton
              onClick={() =>
                console.log("edit")
              }
              type="button"
              customClass="p-2 rounded-lg text-sm text-center bg-transparent hover:border-transparent  flex items-center whitespace-nowrap mr-1 text-[#adb5bd]"
              tooltipsContent={<>{t("examples.banner.edit")}</>}
              iconJSX={<FaEdit />}
            />

            <ToolTipsButton
              onClick={() => console.log("change status") }
              type="button"
              customClass="bg-transparent hover:border-transparent p-2 rounded-lg text-sm text-center flex items-center whitespace-nowrap text-[#adb5bd]"
              tooltipsContent={
                <>{t("examples.banner.modalChangeStatusTttle")}</>
              }
              iconJSX={<FaExchangeAlt />}
            />

            <ToolTipsButton
              onClick={() => console.log("delete")}
              type="button"
              customClass="bg-transparent hover:border-transparent p-2 rounded-lg text-sm text-center flex items-center whitespace-nowrap text-[#adb5bd]"
              tooltipsContent={<>{t("examples.banner.delete")}</>}
              iconJSX={<FaTrashAlt />}
            />
          </div>
        </div>
      );
}