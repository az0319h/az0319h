"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import scrollAnimation from "@/assets/lotties/scroll.json";
import aboutIcon from "@/assets/images/about.svg";
import Image from "next/image";

export default function AboutHeadline() {
  const [isVisible, setIsVisible] = useState(false); // 글자 애니메이션
  const [showLottie, setShowLottie] = useState(false); // Lottie 표시 여부
  const [showIcon, setShowIcon] = useState(false); // 아이콘 표시 여부
  const [hasScrolled, setHasScrolled] = useState(false); // 스크롤 했는지 여부
  const [lastScrollY, setLastScrollY] = useState(0);

  const text1 = "H I\u00A0\u00A0,\u00A0\u00A0I'M\u00A0\u00A0S U N G H O O N.";
  const text2 =
    "I'M\u00A0\u00A0A\u00A0\u00A0W E B\u00A0\u00A0D E V E L O P E R.";
  const charDelay = 50;
  const totalDuration = (text1.length + text2.length) * charDelay;

  useEffect(() => {
    // 1. 텍스트 애니메이션 시작
    const textTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // 2. 텍스트 애니메이션 완료 후 Lottie 표시
    const lottieTimer = setTimeout(() => {
      setShowLottie(true);
    }, totalDuration + 500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(lottieTimer);
    };
  }, [totalDuration]);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // 처음 스크롤이 감지되면 hasScrolled를 true로 설정
      if (!hasScrolled && currentY > 0) {
        setHasScrolled(true);
      }

      // 스크롤이 한 번이라도 발생했다면
      if (hasScrolled || currentY > 0) {
        if (currentY > lastScrollY && currentY > 50) {
          setShowIcon(true);
          setShowLottie(false);
        } else if (currentY === 0) {
          setShowIcon(false);
          setShowLottie(true);
        }
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hasScrolled]);

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

      {/* 하단 애니메이션 영역 - 스크롤에 따라 위치 변경 */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out
        ${
          showIcon
            ? "-bottom-15 sm:-bottom-18 md:-bottom-25 lg:-bottom-35"
            : "bottom-5 md:bottom-10 lg:bottom-15"
        }`}
      >
        {/* Lottie 애니메이션 - 초기에는 숨김, 텍스트 완료 후 표시, 스크롤 시 아이콘과 토글 */}
        <div
          className={`transition-opacity duration-300 ease-out ${
            showLottie ? "opacity-100" : "opacity-0"
          }`}
        >
          <Lottie
            animationData={scrollAnimation}
            loop
            autoplay
            className="size-25 sm:size-30 md:size-40 lg:size-45"
          />
        </div>

        {/* About Icon 이미지 - 스크롤할 때만 표시 */}
        <div
          className={`transition-opacity duration-300 ease-out absolute inset-0 flex justify-center items-center ${
            showIcon ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={aboutIcon}
            alt="aboutIcon"
            width={100}
            className="sm:size-30 md:size-36 lg:size-40"
          />
        </div>
      </div>
    </div>
  );
}
