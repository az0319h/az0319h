"use client";
import { interviews } from "@/constants";
import { useReveal } from "@/hooks";
import { revealStyle } from "@/utils";
import AboutInterviewItem from "./AboutInterviewItem";

export default function AboutInterview() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="md:max-w-7/10">
      <h2
        style={revealStyle(isVisible, 0, 0)}
        className="text-3xl sm:text-4xl md:text-6xl  font-bold   mb-4 md:mb-12"
      >
        I N T E R V I E W
      </h2>
      <ul className="">
        {interviews.map((interview, index) => (
          <nav key={index} style={revealStyle(isVisible, index + 1, 500)}>
            <AboutInterviewItem
              title={interview.title}
              description={interview.description}
            />
          </nav>
        ))}
      </ul>
    </div>
  );
}
