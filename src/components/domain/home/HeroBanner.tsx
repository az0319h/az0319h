"use client";

import { ProjectPayload } from "@/types";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import badge from "@/assets/images/badge.svg";
import { MdInsights } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HeroBanner({ data }: { data: ProjectPayload }) {
  const t = useTranslations("HomePage");
  const locale = useLocale() as "en" | "ko";
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const participants = Array.isArray(data.participants)
    ? data.participants
    : Object.values(data.participants || {});

  return (
    <div className="relative ">
      <div>
        <Link
          href={`/projects/${data.id}`}
          className="relative inline-block w-fit md:block md:mx-auto group shadow-image"
        >
          <Image
            src={data.projectImageUrls[0]}
            alt="projectImageUrl"
            width={765}
            height={0}
            className="block lg:w-250 cursor-pointer "
            unoptimized
          />

          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
        </Link>
        <div className="md:flex md:w-180  md:mx-auto py-7 md:py-10 justify-between lg:w-230 ">
          <div className="mb-5 md:mb-0 md:flex md:items-center md:gap-5 ">
            <Image
              src={badge}
              alt="badge"
              width={120}
              className="!hidden md:!block"
            />
            <div className="flex flex-col items-center md:items-start ">
              <h3 className="text-18-bold mb-2 lg:text-20-bold">
                {data.title[locale]}
              </h3>
              <h4 className="text-center text-14-regular lg:text-16-regular">
                {data.tagline[locale]}
              </h4>
              <span className="text-14-regular lg:text-16-regular">-</span>
              <span className="text-14-regular lg:text-16-regular">
                {" "}
                {data.platform[locale]}
              </span>
            </div>
          </div>

          <div className="px-10 md:px-0 md:flex items-center justify-center md:w-50 lg:w-70">
            <p className="text-center md:text-left">
              <em className="text-12-regular lg:text-14-regular ">
                {data.description[locale]}
              </em>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-bg-300 -mx-5 py-10 px-5 lg:bg-bg-100 lg:w-180 lg:mx-auto lg:px-0 lg:hidden">
        <div className="flex justify-center ">
          {participants.map((participant) => (
            <div key={participant.id} className="flex relative group">
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
        <ul className="[&_div]:flex [&_div]:justify-center [&_div]:items-center [&_div]:size-12 [&_div]:rounded-full [&_div]:border-3 [&_div]:border-black pt-6 md:pt-8 grid grid-cols-2 md:grid-cols-4 max-w-191.25 md:mx-auto  gap-y-6 [&_li]:flex  [&_li]:gap-1.5 [&_li]:flex-col [&_li]:justify-center  [&_li]:items-center [&_li>h4]:text-14-medium [&_li>span]:text-14-semibold">
          <li>
            <div>
              <MdInsights size={28} />
            </div>
            <h4>{t("ScoreSection.performance")}</h4>
            <span>{data.performanceScore}/100</span>
          </li>
          <li>
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
  );
}
