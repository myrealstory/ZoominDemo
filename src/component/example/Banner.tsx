import { LocaleKeysType } from "@/app/i18n"
import { BannerComponent } from "./BannerComponent"
import { mockBanner } from "@/mock/banner"

export const Banner = ({lang}:{lang:LocaleKeysType}) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-3 md:gap-y-6 gap-1 ">
            {mockBanner.map((data,index) => (
                <BannerComponent index={index} lang={lang} data={data}/>
            )
            )}
        </div>
    )
}