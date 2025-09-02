"use client";
import { useState, useEffect, useRef } from "react";

export default function AboutBio() {
  const [isVisible, setIsVisible] = useState(false);
  const bioRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소가 50% 이상 보일 때 애니메이션 시작
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setIsVisible(true);
        } else {
          // 요소가 화면에서 벗어나면 애니메이션 리셋
          setIsVisible(false);
        }
      },
      {
        threshold: [0.3], // 30% 보일 때 트리거
        rootMargin: "-50px 0px", // 50px 여유 공간
      }
    );

    if (bioRef.current) {
      observer.observe(bioRef.current);
    }

    return () => {
      if (bioRef.current) {
        observer.unobserve(bioRef.current);
      }
    };
  }, []);

  const text = `Hi there! I'm Bhavana Kulkarni, a passionate product designer crafting meaningful digital experiences. With over five years of expertise in UI/UX design, I specialize in creating user-centered solutions for SaaS platforms, mobile apps, and web interfaces. From intuitive designs and seamless interactions to scalable systems, I'm driven to transform complex challenges into elegant, impactful designs that enhance everyday experiences.`;

  // 특정 단어들을 볼드로 만들기 위한 설정
  const boldWords = [
    "Bhavana Kulkarni",
    "five years of expertise in UI/UX design",
    "impactful designs that enhance everyday experiences",
  ];

  // 텍스트를 단어별로 분리하고 볼드 처리
  const processText = () => {
    const words = text.split(" ");

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!]/g, ""); // 구두점 제거해서 매칭 확인
      const delay = index * 80; // 각 단어마다 80ms 지연

      // 볼드 처리할 단어인지 확인
      const shouldBold = boldWords.some(
        (boldPhrase) =>
          boldPhrase.toLowerCase().includes(cleanWord.toLowerCase()) &&
          cleanWord.length > 2
      );

      return (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ease-out mr-1 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${shouldBold ? "font-bold text-black-100/75" : ""}`}
          style={{
            transitionDelay: `${delay}ms`,
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div ref={bioRef} className="text-20-bold text-gray-600 leading-relaxed   ">
      <div>I CODE</div>
      <div>WEB DEVELOPER</div>
      <div className="overflow-hidden">{processText()}</div>
    </div>
  );
}
