"use client";
import { ProjectPayload } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import badge from "@/assets/images/badge.svg";
import { MdInsights } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function HeroBannerWide({ data }: { data: ProjectPayload }) {
  const t = useTranslations("HomePage");
  const locale = useLocale() as "en" | "ko";
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const participants = Array.isArray(data.participants)
    ? data.participants
    : Object.values(data.participants || {});

  return (
    <div className="z-0 pl-25 relative h-168.75">
      <h1 className="mb-4 text-16-semibold">{t("title")}</h1>
      <Link
        href={`/projects/${data.id}`}
        className="z-10 relative inline-block w-fit group shadow-image"
      >
        <Image
          src={data.projectImageUrls[0]}
          alt="projectImageUrl"
          width={740}
          height={0}
          className="block cursor-pointer"
          unoptimized
        />

        {/* 오버레이 */}
        <div className=" absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      </Link>

      <div className="absolute top-10 right-5 w-75">
        <Image
          src={badge}
          alt="badge"
          width={120}
          className="!hidden md:!block ml-3 mb-6"
        />
        <div className="flex flex-col gap-0.5">
          <h3 className="text-18-bold">{data.title[locale]}</h3>
          <h4 className="text-14-regular">{data.tagline[locale]}</h4>
          <span className="text-16-regular">-</span>
          <h5 className="text-14-regular"> {data.platform[locale]}</h5>
        </div>
      </div>

      <div className="bg-bg-300 max-w-215 w-full absolute h-90 right-0 bottom-0">
        <div className="relative h-5/10 px-4 pt-7">
          <div className="absolute w-3/10 right-15 h-full">
            <p className="">
              <em className="text-14-regular line-clamp-4 leading-5">
                {data.description[locale]}
              </em>
            </p>
            <div className="pt-6 flex">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex  relative group w-fit"
                >
                  {participant.imageUrl && (
                    <>
                      <a href={participant.githubUrl} target="_blank">
                        <Image
                          src={participant.imageUrl}
                          alt={`${participant.name}`}
                          width={40}
                          height={40}
                          onMouseEnter={() => setHoveredId(participant.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        />
                      </a>

                      {/* 툴팁 */}
                      <AnimatePresence>
                        {hoveredId === participant.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
                          >
                            <div className="relative flex flex-col gap-1.5 items-center bg-black-100 text-white text-14-regular shadow px-3 py-2 rounded-lg whitespace-nowrap">
                              {participant.name}
                              <span className="text-12-regular">
                                {participant.role}
                              </span>
                              {/* 화살표 */}
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black-100"></div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-5/10 p-4">
          <ul className="[&_div]:flex [&_div]:justify-center [&_div]:items-center [&_div]:size-12 [&_div]:rounded-full [&_div]:border-3 [&_div]:border-black pt-6 md:pt-8 grid grid-cols-2 md:grid-cols-4 max-w-191.25 md:mx-auto  gap-y-6 [&_li]:flex  [&_li]:gap-1.5 [&_li]:flex-col [&_li]:justify-center  [&_li]:items-center [&_li>h4]:text-14-medium [&_li>span]:text-14-semibold">
            <li>
              <div>
                <MdInsights size={28} />
              </div>
              <h4>{t("ScoreSection.performance")}</h4>
              <span>{data.performanceScore}/100</span>
            </li>
            <li className="">
              <div>
                <MdInsights size={28} />
              </div>
              <h4>{t("ScoreSection.seo")}</h4>
              <span>{data.seoScore}/100</span>
            </li>
            <li>
              <div>
                <MdInsights size={28} />
              </div>
              <h4>{t("ScoreSection.accessibility")}</h4>
              <span>{data.accessibilityScore}/100</span>
            </li>

            <li>
              <p className="text-20-bold">{data.overallScore}/100</p>
              <h4>{t("ScoreSection.overall")}</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
