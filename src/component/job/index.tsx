"use client";

import { LocaleKeysType } from "@/app/i18n";
import { useTranslation } from "@/app/i18n/client";
import { JobArray } from "@/mock/job";
import { PersonalInfo } from "@/mock/personalInfo";
import { getYearsInRange } from "@/utils/helper";
import React from "react";
import { useState } from "react";
import { useWindowSize } from "@/utils/useWindowSize";

interface TimelineItem {
    title:string;
    startDate: string ; // Format : YYYY-MM-DD
    endDate: string; // Format : YYYY-MM-DD
}

const JobExperience = ({lang}:{lang:LocaleKeysType}) => {
    const { translate: t } = useTranslation(lang);
    const {width} = useWindowSize();
    const jobsExperience = JobArray();
    const personalInfo = PersonalInfo(lang);
    const allYears = getYearsInRange("2019-01-01","now");
    const [jobToogle, setJobToogle] = useState<number | null>(null);

    const groupedJobsByYear = jobsExperience.reduce((acc, job) => {
        const year = new Date(job.startDate).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(job);
        return acc;
    }
    , {} as { [key: number] : typeof jobsExperience});

    const goto = (e:React.MouseEvent<HTMLButtonElement>,link : string) => {
        e.preventDefault();
        window.open(link, "_blank");
    }

    return (
        <div className="flex lg:flex-row flex-col w-full md:h-full h-fit mt-10 gap-20">
            <div className="relative z-10 md:max-w-[400px] w-full flex flex-shrink-0 flex-col justify-center md:pl-14 md:py-10 p-4 bg-secondaryColor text-white">
                {personalInfo.map((info)=>(
                    <div className="flex flex-shrink-0 items-center gap-4 p-4" key={info.id}>
                        <info.icon className=""/>
                        {info.link ? (
                            <button 
                                className="relative underline text-base cursor-pointer z-10 flex-shrink-0"
                                onClick={(e)=>goto(e,info.link)}
                                >
                                {info.text}
                            </button>
                        ):(
                            <p className="text-base">
                                {info.text}
                            </p>
                        ) }
                    </div>
                ))}
            </div>
            {width > 768 && (
                <div className="w-full bg-white relative straightLine">
                    {allYears.map((year) => {
                        const yearEvents = jobsExperience.filter((item) =>
                                new Date(item.startDate).getFullYear() === year
                        );

                        // const groupedEvents = yearEvents.reduce((acc, job) => {
                        //     const jobYear = new Date(job.startDate).getFullYear();
                        //     if(jobYear === year){
                        //         acc.push(job);
                        //     }
                        //     return acc;
                        // }, [] as typeof jobsExperience);
                        
                    return (
                        <div key={year} className="flex items-center mb-10">
                            <div className={`${yearEvents.length > 0 ? "text-lg text-secondaryColor font-semibold activeDot" : "text-sm text-secondaryColor/60 deactiveDot"} relative dot mr-16`}>{year}</div>
                            {/* Display events if available*/}
                            {yearEvents.length > 0 && (
                                <div className="flex flex-col items-center gap-4 ml-4">
                                    {yearEvents.map((job,index) => (
                                        <div key={index} className="p-2 flex gap-6 items-center text-secondaryColor text-base">
                                            <p>
                                                {job.startDate} - {job.endDate}
                                            </p>
                                            <div 
                                                className="ml-6 text-base relative"
                                                onMouseEnter={()=>setJobToogle(job.id)}
                                                onMouseLeave={()=>setJobToogle(null)}
                                                onClick={()=> width < 768 && setJobToogle(job.id)}
                                                >
                                                <p className="font-semibold">
                                                    {t(`job.${job.title}`)} 
                                                </p>
                                                <p className="text-xs">@ {t(`job.${job.company}`)}</p>
                                                {jobToogle === job.id && (
                                                    <div className="absolute lg:top-6 top-0 left-1/2 -translate-x-1/2 bg-contentBG p-6 rounded-xl text-sm box-content text-dark lg:w-[600px] md:w-[450px] w-[300px] z-10">
                                                        <ul className="w-full mb-2" dangerouslySetInnerHTML={{__html:t(`job.${job.description}`)}}></ul>
                                                        <ul className="w-full" dangerouslySetInnerHTML={{__html:t(`job.${job.project}`)}}></ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                    })}
                </div>
            )}
            
        </div>
    )

}

export default JobExperience;