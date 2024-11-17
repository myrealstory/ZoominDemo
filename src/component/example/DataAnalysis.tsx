"use client";
import { AreasListType, CLIENTDataProps, CountryProps } from "@/type/Area";
import ClientData from "@/mock/mockArea.json";
import { LocaleKeysType } from "@/app/i18n";
import { useTranslation } from "@/app/i18n/client";
import { CustomSelect } from "@/component/CustomSelect";
import { useMemo, useState } from "react";
import { combineEnZH, mapRegionsToAreas } from "@/utils/helper";

// Recursive Component to Render JSON Structure
const RenderJson = ({ data }: { data: unknown }) => {
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return (
        <>
          {"["}
          <ul className="ml-4 list-none">
            {data.map((item, index) => (
              <li key={index}>
                <RenderJson data={item} />
              </li>
            ))}
          </ul>
          {"]"}
        </>
      );
    } else {
      return (
        <>
          {"{"}
          <ul className="ml-4">
            {Object.entries(data).map(([key, value]) => (
              <li key={key}>
                <strong>{key}: </strong>
                <RenderJson data={value} />
              </li>
            ))}
          </ul>
          {"}"}
        </>
      );
    }
  }
  return <span>{String(data)}</span>;
};

export const DataAnalysis = ({ lang }: { lang: LocaleKeysType }) => {
  const { translate: t } = useTranslation(lang);
  const clientData = ClientData.clientData;
  const [selectValue, setSelectValue] = useState({
    country: "",
    region1: "",
    region2: "",
  });

  //handing data reorganization
  const countryData = useMemo(() => {
    return clientData.country.map((item: CountryProps) => ({
      label: item.id,
      name: lang === "en" ? item.nameEn : item.nameZh,
      value: combineEnZH(item.nameEn, item.nameZh),
    }));
  }, [ClientData, lang]);

  // Areas
  const areas = useMemo(() => {
    if (clientData && Object.entries(clientData).length > 0) {
      return mapRegionsToAreas(clientData.region1, clientData.region2);
    }
    return [] as AreasListType[];
  }, [clientData, selectValue.country]);

  const region1Options = useMemo(() => {
    // Determine data source based on availability
    if (!selectValue.country || !clientData) return [];

    const countryenName = selectValue.country.split("|")[0];
    if (clientData.country.length === 0) return [];

    // Find the selected country based on `countryenName`
    const findCountry = clientData.country.find(
      (country) => country.nameEn === countryenName
    );
    if (!findCountry) return [];

    // Filter `areas` to include only regions in the selected country’s `region1`
    return areas
      .filter((region1) => findCountry.region1.includes(region1.id))
      .map((item) => (
        <option key={item.AreaEN} value={item.AreaEN}>
          {lang === "en" ? item.AreaEN : item.AreaCN}
        </option>
      ));
  }, [selectValue.country, clientData, areas, lang]); // Depend on the country and data source

  const region2Options = useMemo(() => {
    // Find the selected region1 to filter region2 areas
    const selectedRegion1 = areas.find(
      (item) => item.AreaEN === selectValue.region1
    );

    if (selectedRegion1) {
      return selectedRegion1.Areas.map((item) => (
        <option key={item.en} value={item.en}>
          {lang === "en" ? item.en : item.cn}
        </option>
      ));
    }

    return []; // Return empty array if no region1 is selected
  }, [selectValue.region1, areas, lang]);

  const handleAddCountry = (countryId: number) => {
    const countryExist = countryData.find((item) => item.label === countryId);
    if (!countryExist) return;
    setSelectValue((prevData) => ({
      ...prevData,
      country: countryExist.value, // Add the new country id to the array
    }));
  };

  const handleChange = (
    event: string,
    key: "region1" | "region2" | "type" | "status"
  ) => {
    if (key === "region1") {
      return setSelectValue((prevData) => ({
        ...prevData,
        region1: event,
        region2: "",
      }));
    }

    setSelectValue((prevData) => ({
      ...prevData,
      [key]: event,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="max-h-[350px] h-full overflow-y-auto p-4 border border-secondaryColor text-secondaryColor text-xs">
        <RenderJson data={ClientData} />
      </div>
      <div className="flex md:flex-row flex-col gap-4 md:items-center px-4 pb-6 md:pb-0">
        <CustomSelect
          lang={lang}
          label={t("examples.countryLabel")}
          className="max-w-[200px] w-full"
          onChangeById={handleAddCountry}
          allowEmpty
          firstOption={t("examples.selectCountry")}
          options={countryData}

          // error={formValidation.country.message}
        />
        <CustomSelect
          lang={lang}
          label={t("examples.region1Label")}
          className="max-w-[200px] w-full"
          onChange={(e) => handleChange(e, "region1")}
          allowEmpty
          disabled={
            selectValue.country.length === 0 || region1Options.length === 0
          }
          firstOption={t("examples.region1")}
          renderOptions={() => region1Options}
          // error={formValidation.region1.message}
        />
        <CustomSelect
          lang={lang}
          label={t("examples.region2Label")}
          className="max-w-[200px] w-full"
          onChange={(e) => handleChange(e, "region2")}
          allowEmpty
          firstOption={t("examples.region2")}
          disabled={region2Options.length === 0}
          renderOptions={() => region2Options}
          // error={formValidation.region2.message}
        />
      </div>
    </div>
  );
};
