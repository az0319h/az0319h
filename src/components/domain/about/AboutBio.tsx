"use client";

import { boldWords } from "@/constants";
import { useReveal } from "@/hooks";
import { useTranslations } from "next-intl";

export default function AboutBio() {
  const t = useTranslations("ProjectsPage");
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  const text = t("bio");

  const highlightText = (input: string) => {
    let result = input;
    boldWords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      result = result.replace(
        regex,
        `<span class="text-16-semibold md:text-22-semibold lg:text-24-semibold md:leading-10 lg:leading-12 text-primary-blue-200">$&</span>`
      );
    });
    return result;
  };

  return (
    <div
      ref={ref}
      className={`max-w-191.25 mx-auto pt-16 md:pt-26 lg:pt-36 text-left text-16-regular md:text-22-regular md:leading-10 lg:leading-12 lg:text-24-regular leading-relaxed transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      dangerouslySetInnerHTML={{ __html: highlightText(text) }}
    />
  );
}
