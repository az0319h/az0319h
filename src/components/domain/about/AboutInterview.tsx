"use client";
import { useReveal } from "@/hooks";
import { revealStyle } from "@/utils";
import { useTranslations } from "next-intl";
import { Interview } from "@/types";
import InterviewItem from "./InterviewItem";
import parse from "html-react-parser";

export default function AboutInterview() {
  const t = useTranslations("ProjectsPage");
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="md:max-w-7/10">
      <h2
        style={revealStyle(isVisible, 0, 0)}
        className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-12 "
      >
        {t("interviewTitle")}
      </h2>
      <ul>
        {(t.raw("interviewsList") as Interview[]).map((interview, index) => (
          <nav key={index} style={revealStyle(isVisible, index + 1, 500)}>
            <InterviewItem
              title={interview.title}
              description={parse(interview.description)}
            />
          </nav>
        ))}
      </ul>
    </div>
  );
}
