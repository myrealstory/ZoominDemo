import { AreasListType, nameProps, Region1Props } from "@/type/Area";

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
  