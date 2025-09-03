"use client";
import { corebeliefs } from "@/constants";
import { useReveal } from "@/hooks";
import { revealStyle } from "@/utils";
import CoreBeliefItem from "./CoreBeliefItem";

export default function AboutCoreBeliefs() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="flex justify-end">
      <div className="md:max-w-7/10">
        <h2
          style={revealStyle(isVisible, 0, 0)}
          className="text-3xl sm:text-4xl md:text-6xl  font-bold   mb-4 md:mb-12"
        >
          C O R E&nbsp;&nbsp;B E L I E F S
        </h2>
        <ul className="[&_li]:flex [&_li]:items-center [&_li]:justify-between [&_li]:gap-6  [&_li]:py-5 md:[&_li]:py-6 [&_div]:flex [&_div]:flex-col [&_div]:gap-2 md:[&_div]:gap-3">
          {corebeliefs.map((corebelief, index) => (
            <nav key={index} style={revealStyle(isVisible, index + 1, 500)}>
              <CoreBeliefItem
                title={corebelief.title}
                description={corebelief.description}
              />
            </nav>
          ))}
        </ul>
      </div>
    </div>
  );
}
