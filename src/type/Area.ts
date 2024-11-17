export type CountryProps= {
    id:number;
    nameEn: string;
    nameZh: string;
    code: string;
    region1: number[];
};

export type Region1Props = {
    id: number;
    enName: string;
    zhName: string;
    region2: number[];
};
export type nameProps = {
    id: number;
    enName: string;
    zhName: string;
}

export type CLIENTDataProps = {
    country: CountryProps[];
    region1: Region1Props[];
    region2: nameProps[];
}

export interface AreasListType {
    id:number;
    AreaEN: string;
    AreaCN: string;
    Areas: {
      en: string;
      cn: string;
    }[];
  }
