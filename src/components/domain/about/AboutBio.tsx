"use client";
import { useState, useEffect, useRef } from "react";

export default function AboutBio() {
  const [isVisible, setIsVisible] = useState(false);
  const bioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: [0.3],
        rootMargin: "-50px 0px",
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

  const text = `I am a developer with a strong focus on building web services that users can intuitively understand and conveniently use. With experience in React.js, Next.js, and Node.js, I have worked on solving problems through a UI/UX-centered approach and delivering high-quality services. My goal is to grow into a developer who not only implements features but also maximizes the value of the user experience.`;

  const boldWords = [
    "developer",
    "React.js",
    "Next.js",
    "Node.js",
    "UI/UX-centered approach",
    "user experience",
  ];

  const processText = () => {
    const words = text.split(" ");

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!]/g, ""); // 구두점 제거
      const delay = index * 60; // 단어마다 60ms 지연

      // 볼드 처리 여부 확인
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
          } ${
            shouldBold
              ? "text-16-semibold md:text-22-semibold md:leading-10 lg:leading-12 text-primary-blue-200"
              : ""
          }`}
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
    <div
      ref={bioRef}
      className="max-w-191.25 mx-auto  pt-16 pb-30 md:pt-26 md:pb-40 lg:pt-36 lg:pb-50  text-center text-16-regular md:text-22-regular md:leading-10 lg:leading-12 lg:text-24-regular leading-relaxed"
    >
      <div className="overflow-hidden">{processText()}</div>
    </div>
  );
}
