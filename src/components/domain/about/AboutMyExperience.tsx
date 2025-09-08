"use client";
import { useReveal } from "@/hooks";
import { revealStyle } from "@/utils";
import { useTranslations } from "next-intl";
import ExperienceItem from "./ExperienceItem";
import { Experience } from "@/types";

export default function AboutMyExperience() {
  const t = useTranslations("ProjectsPage");
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="md:max-w-7/10 pb-50 sm:pb-75 md:pb-100">
      <h2
        style={revealStyle(isVisible, 0, 0)}
        className="text-3xl sm:text-4xl md:text-6xl  font-bold   mb-4 md:mb-12"
      >
        {t("experienceTitle")}
      </h2>
      <ul className="[&_li]:flex [&_li]:items-center [&_li]:justify-between [&_li]:gap-6  [&_li]:py-5 md:[&_li]:py-6 [&_div]:flex [&_div]:flex-col [&_div]:gap-2 md:[&_div]:gap-3">
        {(t.raw("experienceList") as Experience[]).map((exp, index) => (
          <nav key={index} style={revealStyle(isVisible, index + 1, 500)}>
            <ExperienceItem
              title={exp.title}
              company={exp.company}
              companyUrl={exp.companyUrl}
              period={exp.period}
            />
          </nav>
        ))}
      </ul>
    </div>
  );
}
