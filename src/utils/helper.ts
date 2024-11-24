import { AreasListType, nameProps, Region1Props } from "@/type/Area";
import { TFunction } from "next-i18next";

export const getYearsInRange = (start: string, end: string) => {
    const startYear = new Date(start).getFullYear();
    const endYear = end === "now" ? new Date().getFullYear() : new Date(end).getFullYear();
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).reverse();
}

export const combineEnZH = (en: string, zh: string) => {
    return `${en}|${zh}`;
  };

  export const mapRegionsToAreas = (
    region1: Region1Props[],
    region2: nameProps[]
  ): AreasListType[] => {
    return region1.map((region1Item) => {
      const region2Mapped = region1Item.region2
        .map((region2ID: number) => {
          const region2Item = region2.find((r) => r.id === region2ID);
          return region2Item
            ? {
                en: region2Item.enName,
                cn: region2Item.zhName,
              }
            : { en: "", cn: "" };
        })
        .filter(Boolean);
  
      return {
        id: region1Item.id,
        AreaEN: region1Item.enName,
        AreaCN: region1Item.zhName,
        Areas: region2Mapped,
      };
    });
  };
  
  export const dayLeft = (compareDay:string,t:TFunction):{message: string; status:string} => {
    const [year, month, day] = compareDay.split("-").map(Number);
    const compareDate = new Date(year,month-1 , day); //parse the date
    const today = new Date();
    today.setHours(0,0,0,0); //Normalize time
  
    const differenceInMilliseconds = compareDate.getTime() - today.getTime();
    const dayLeft = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)); // Convert ms to days
  
    if(dayLeft > 0) {
      return { message : t("examples.banner.beforeDay" , {dayLeft:dayLeft}), status: "future"};
    }else if( dayLeft === 0){
      return { message : t("examples.banner.todayDay"), status: "today"};
    }else {
      return { message : t("examples.banner.expired" , {dayLeft:Math.abs(dayLeft)}), status: "past"};
    }
  };
  