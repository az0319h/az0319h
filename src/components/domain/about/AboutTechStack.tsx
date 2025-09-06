"use client";
import { FaReact } from "react-icons/fa";
import nextjsIcon from "@/assets/images/nextJs.svg";
import photoshopIcon from "@/assets/images/photoshop.svg";
import {
  SiNodedotjs,
  SiTypescript,
  SiExpress,
  SiPrisma,
  SiFirebase,
  SiVercel,
  SiJavascript,
} from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import Image from "next/image";
import { useReveal } from "@/hooks";
import { revealStyle } from "@/utils";
import { useTranslations } from "next-intl";

export default function AboutTechStack() {
  const t = useTranslations("ProjectsPage");
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  const techItems = [
    { icon: <FaReact size={26} color="#61DAFB" />, name: "React" },
    {
      icon: <Image src={nextjsIcon} alt="next.js" width={26} />,
      name: "Next.js",
    },
    { icon: <SiJavascript size={26} color="#F7DF1E" />, name: "JavaScript" },
    { icon: <SiTypescript size={26} color="#3178C6" />, name: "TypeScript" },
    {
      icon: <RiTailwindCssFill size={26} color="#06B6D4" />,
      name: "TailwindCSS",
    },
    { icon: <SiNodedotjs size={26} color="#339933" />, name: "Node.js" },
    { icon: <SiExpress size={26} color="#000000" />, name: "Express" },
    { icon: <SiPrisma size={26} color="#2D3748" />, name: "Prisma" },
    { icon: <SiFirebase size={26} color="#FFCA28" />, name: "Firebase" },
    { icon: <SiVercel size={26} />, name: "Vercel" },
    {
      icon: <Image src={photoshopIcon} alt="Photoshop" width={26} />,
      name: "Adobe Photoshop",
    },
  ];

  return (
    <div ref={ref} className="max-w-191.25 mx-auto pb-50 sm:pb-75 md:pb-100">
      <p
        className={`text-16-regular md:text-22-regular lg:text-24-regular py-6 transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={revealStyle(isVisible, 0, 0)}
      >
        {t("techStackTitle")}
      </p>
      <div>
        <ul className="flex flex-wrap gap-3 lg:gap-4">
          {techItems.map((tech, index) => (
            <li
              key={index}
              className={`gap-1.5  px-4 py-2 rounded-4xl flex items-center w-fit bg-primary-white-100 shadow transition-all duration-500 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={revealStyle(isVisible, index + 1, 200)}
            >
              {tech.icon}
              <span className="text-14-regular">{tech.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
