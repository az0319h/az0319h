"use client";
import { ProjectPayload } from "@/types";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { FaArrowRightLong } from "react-icons/fa6";
import linkIcon from "@/assets/images/link.svg";
import { useLocale, useTranslations } from "next-intl";

export default function ProjectCard({
  data,
  currentTab,
}: {
  data: ProjectPayload;
  currentTab: string;
}) {
  const t = useTranslations("ProjectsPage");
  const locale = useLocale() as "en" | "ko";
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/projects/${data.id}?tab=${currentTab}`)}
      className="group flex flex-col z-30 justify-center cursor-pointer"
    >
      <div className="relative w-fit">
        <Image
          src={data.projectImageUrl}
          alt="projectImageUrl"
          width={370}
          height={0}
          unoptimized
          className="block"
        />
        <div
          className="
            absolute inset-0 bg-black/50 opacity-0
            transition-opacity duration-300
            group-hover:opacity-100 text-gray-100
            flex justify-center items-center
          "
        >
          <div className="text-gray-200 absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <div className="absolute right-5 top-5 md:top-7 md:right-7 z-40">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(data.projectUrl, "_blank", "noopener,noreferrer");
                }}
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <Image src={linkIcon} alt="link" width={18} />
              </button>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-1/2">
              <div className=" flex items-center gap-2 text-16-semibold">
                <h4>{t("viewProject")}</h4>
                <FaArrowRightLong />
              </div>
            </div>
            <div className="absolute left-5 top-5 md:top-7 md:left-7 text-12-medium ">
              {t("updatedText")}
            </div>
          </div>
        </div>
      </div>

      <h4 className="max-w-92.5 pt-2 md:pt-3 text-14-semibold  md:text-16-semibold  line-clamp-2">
        {data.title[locale]} - {data.tagline[locale]}
      </h4>
    </div>
  );
}
