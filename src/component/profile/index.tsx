"use client";
import { LocaleKeysType } from "@/app/i18n";
import Avatar from "@/public/image/Avatar.jpg";
import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";
import { SkillList } from "@/mock/skill";
import { useState } from "react";
import { useWindowSize } from "@/utils/useWindowSize";

const Profile = ({ lang }: { lang: LocaleKeysType }) => {
  const { translate: t } = useTranslation(lang);
  const {width} = useWindowSize();
  const skills = SkillList(lang);
  const [hoverSkill, setHoverSkill] = useState<number | null>(null);

  const handleHover = (id: number) => {
    setHoverSkill(id);
    // console.log(id);
  };

  return (
    <div className="w-full flex flex-col justify-between lg:gap-6 gap-3 lg:max-w-[1300px] mx-auto z-10">
      <div className="flex gap-4 justify-between lg:flex-row flex-col-reverse">
        <div className="flex flex-col gap-1 px-4  text-left w-full lg:max-w-[750px] max-w-auto">
          <h3 className=" text-dark text-2xl font-bold ">
            {t("profile.name")}
          </h3>
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
