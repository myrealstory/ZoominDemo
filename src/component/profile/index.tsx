"use client";
import { LocaleKeysType } from "@/app/i18n";
import Avatar from "@/public/image/Avatar.jpg";
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import { SkillList } from "@/mock/skill";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/utils/useWindowSize";
import { CustomSwitch } from "../CustomSwitch";
import { usePathname, useRouter } from "next/navigation";
import i18next from "i18next";

const Profile = ({ lang }: { lang: LocaleKeysType }) => {
  const { translate: t} = useTranslation(lang);
  const path = usePathname();
  const router = useRouter();
  const {width, scrollY} = useWindowSize();
  const skills = SkillList(lang);
  const [hoverSkill, setHoverSkill] = useState<number | null>(null);

  const handleHover = (id: number) => {
    setHoverSkill(id);
    // console.log(id);
  };

  useEffect(() => {
    const saveScrollY = localStorage.getItem("savePosition");
    if (saveScrollY) {
      window.scrollTo(0, parseInt(saveScrollY));
      localStorage.removeItem("savePosition");
    }
  }
  , []);

  const handleChangeLanguage = () => {
    let currentLanguage: LocaleKeysType;
    if (lang === "en") {
      i18next.changeLanguage("tc");
      currentLanguage = "tc";
    } else {
      i18next.changeLanguage("en");
      currentLanguage = "en";
    }
    // window.location.href = path.replace(`/${lang}`,`/${currectLanguage}`);
    router.push(`/${currentLanguage}`);
    localStorage.setItem("savePosition", scrollY.toString());
  }

  return (
    <div className="w-full flex flex-col justify-between lg:gap-6 gap-3 lg:max-w-[1300px] mx-auto z-10">
      <div className="flex gap-4 justify-between lg:flex-row flex-col-reverse">
        <div className="flex flex-col gap-1 px-4  text-left w-full lg:max-w-[750px] max-w-auto">
          <div 
            className="fixed top-0 left-0 w-full bg-primaryColor text-white md:text-lg text-sm z-[999] duration-500 ease-in-out transform"
            style={{transform: scrollY > 2650 ? "translateY(0)" : "translateY(-100%)"}}
            >
            <div className="flex justify-between md:justify-start items-center pl-6 md:py-3 py-2 gap-6">
            <h3 className=" text-white font-bold ">
              {t("profile.name")}
            </h3>
            <CustomSwitch 
              toogle={lang === "en"}
              trigger={handleChangeLanguage}
            />
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <h3 className=" text-dark text-2xl font-bold ">
              {t("profile.name")}
            </h3>
            <CustomSwitch 
              toogle={lang === "en"}
              trigger={handleChangeLanguage}
            />
          </div>
          <p className="text-secondaryColor text-sm mb-2">
            {t("profile.title")}
          </p>
          <p
            className="text-dark"
            dangerouslySetInnerHTML={{ __html: t("profile.content") }}
          />
          <div className="flex flex-wrap lg:flex-nowrap lg:gap-8 gap-6 items-center mt-16">
            {skills.map((skill) => {
              return (
                <div
                  key={skill.id}
                  className="flex items-center gap-1 relative z-50"
                  onMouseEnter={() => width > 768 && handleHover(skill.id)}
                  onMouseLeave={() => width > 768 && setHoverSkill(null)}
                  onClick={() => width < 768 && handleHover(skill.id)}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    className="w-auto h-[50px] object-cover "
                  />
                  {/* <p className='text-dark text-sm'>{skill.name}</p> */}
                  {skill.id === hoverSkill && (
                    <div className="absolute bottom-[70px] left-1/2 -translate-x-1/2 bg-secondaryColor text-white text-sm text-nowrap w-auto lg:px-4 lg:py-2 p-2 box-content rounded-xl z-50">
                      {skill.hoverText}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-3 border-primaryColor border-4  ">
          <Image
            src={Avatar}
            alt="avatar"
            className="md:w-[300px] w-full h-auto aspect-square object-cover mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
