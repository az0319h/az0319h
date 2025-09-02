"use client";
import Lottie from "lottie-react";
import scrollAnimation from "@/assets/lotties/scroll.json";
import { useState, useEffect } from "react";

export default function AboutHeadline() {
  const [isVisible, setIsVisible] = useState(false); // 글자 애니메이션
  const [showLottie, setShowLottie] = useState(false); // Lottie 표시 여부

  const text1 = "H I\u00A0\u00A0,\u00A0\u00A0I'M\u00A0\u00A0S U N G H O O N.";
  const text2 =
    "I'M\u00A0\u00A0A\u00A0\u00A0W E B\u00A0\u00A0D E V E L O P E R.";
  const charDelay = 50;
  const totalDuration = (text1.length + text2.length) * charDelay;

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const lottieTimer = setTimeout(() => {
      setShowLottie(true);
    }, totalDuration + 500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(lottieTimer);
    };
  }, [totalDuration]);

  const renderAnimatedText = (text: string, lineIndex: number) =>
    text.split("").map((char: string, index: number) => {
      const delay = (lineIndex * text1.length + index) * charDelay;
      return (
        <span
          key={`${lineIndex}-${index}`}
          className={`inline-block transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: `${delay}ms`,
            visibility: char === " " ? "hidden" : "visible",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });

  return (
    <div
      className="relative flex justify-center items-center 
      h-[calc(100vh-4.875rem)] 
      md:h-[calc(100vh-7.6875rem)] 
      lg:h-[calc(100vh-7.6875rem)]"
    >
      <h2 className="text-center text-2xl leading-8 sm:text-3xl sm:leading-10 font-bold md:text-6xl md:leading-18 lg:text-[5rem] lg:leading-24 break-words mb-36.5 md:mb-54 lg:mb-53">
        <div className="block">{renderAnimatedText(text1, 0)}</div>
        <div className="block">{renderAnimatedText(text2, 1)}</div>
      </h2>

      <div
        className={`absolute left-1/2 bottom-5 -translate-x-1/2 
        transition-all duration-300 ease-out
        ${showLottie ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
        md:bottom-10 lg:bottom-15`}
      >
        <Lottie
          animationData={scrollAnimation}
          loop
          autoplay
          className="size-30 md:size-40 lg:size-45"
        />
      </div>
    </div>
  );
}
