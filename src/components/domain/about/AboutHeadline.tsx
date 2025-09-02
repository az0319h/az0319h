"use client";
import { useState, useEffect } from "react";

export default function AboutHeadline() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const text1 = "H I\u00A0\u00A0,\u00A0\u00A0I'M\u00A0\u00A0S U N G H O O N.";
  const text2 =
    "I'M\u00A0\u00A0A\u00A0\u00A0W E B\u00A0\u00A0D E V E L O P E R.";

  const renderAnimatedText = (text: string, lineIndex: number) => {
    return text.split("").map((char: string, index: number) => {
      const delay = (lineIndex * text1.length + index) * 50;

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
  };

  return (
    <div
      className="flex justify-center items-center 
      h-[calc(100vh-4.875rem)] 
      md:h-[calc(100vh-7.6875rem)] 
      lg:h-[calc(100vh-7.6875rem)]"
    >
      <h2 className=" text-center text-2xl leading-8 sm:text-3xl sm:leading-10 font-bold md:text-6xl md:leading-18 lg:text-[5rem] lg:leading-24 break-words mb-36.5 md:mb-54 lg:mb-53">
        <div className="block">{renderAnimatedText(text1, 0)}</div>
        <div className="block">{renderAnimatedText(text2, 1)}</div>
      </h2>
    </div>
  );
}
