"use client";
import { LocaleKeysType } from "@/app/i18n";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { IoMdCloudUpload } from "react-icons/io";
import noProfile from "@/images/no-profile.png";
import Image from "next/image";
import { useWindowSize } from "@/utils/useWindowSize";

export const Upload = ({lang}:{lang:LocaleKeysType}) => {
    const {translate : t} = useTranslation(lang);
    const {width} = useWindowSize();
    const [preview, setPreview] = useState<string | null>(null);
    const [profileLoading, setProfileLoading] = useState<boolean>(false);
    const [uploadMode, setUploadMode] = useState<"drop" | "select">("drop");

    const handleFileUpload = (file: File) => {
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
            setProfileLoading(false);
            setUploadMode("select");
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setProfileLoading(true);
        if (file) {
          handleFileUpload(file);
        }
    }

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setProfileLoading(true);
        const file = e.dataTransfer.files[0];
        if (file) {
          handleFileUpload(file);
        }
    }

    useEffect(() => {
      if(width < 768){
        setUploadMode("select");
      }else {
        setUploadMode("drop");
      }
    }, [width]);
  

    
    return (
        <div className="pt-4 w-full flex justify-center flex-col items-center gap-4 mb-6">
          <input
            id="file-upload"
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div
            className="my-2 flex justify-center"
            onDragOver={(e) => e.preventDefault()}
          >
            <div
              className="rounded-full overflow-hidden border-8 border-secondaryColor box-content duration-1000 transform flex-col items-center "
              style={{
                width: uploadMode === "drop" ? "500px" : width < 768 ? "100px" :"200px",
                height: uploadMode === "drop" ? "250px" : width < 768 ? "100px" :"200px",
                borderRadius: uploadMode === "drop" ? "16px" : "50%",
                borderStyle: uploadMode === "drop" ? "dashed" : "solid",
                borderWidth: uploadMode === "drop" ? "4px" : width < 768 ? "4px":"8px",
                display: uploadMode === "drop" ? "flex" : "block",
              }}
              onDrop={uploadMode === "drop" ? handleFileDrop : undefined}
            >
              {uploadMode === "drop" && (
                <>
                  <IoMdCloudUpload className="text-secondaryColor text-[8rem]" />
                  <p className="text-secondaryColor text-2xl text-center mb-1">
                    {t("examples.dragdrop")}
                  </p>
                  <p className="text-secondaryColor text-sm text-center mb-4">
                    {t("examples.uploadContent")}
                  </p>
                </>
              )}
              {profileLoading ? (
                <div className="loading flex items-center justify-center h-full">
                <CgSpinner className="Spin !text-[5rem]" />
              </div>
              ):(
                <Image
                  src={preview ? preview : noProfile}
                  alt="Profile Preview"
                  width={0}
                  height={0}
                  className="w-full h-full object-cover"
                  style={{ display: uploadMode === "drop" ? "none" : "block" }}
                />
              )}
            </div>
          </div>
          <label
            htmlFor="file-upload"
            className="w-full py-2 rounded-xl bg-primaryColor text-white hover:bg-secondaryColor text-center duration-1000 transform lg:text-base text-sm text-nowrap"
            style={{ maxWidth: uploadMode === "drop" ? "70%" : width < 768 ? "auto" :"150px" }}
          >
            {t("examples.chooseFile")}
          </label>
        </div>
    );

}