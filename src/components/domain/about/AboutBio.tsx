"use client";

import { useReveal } from "@/hooks";

export default function AboutBio() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

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
              ? "text-16-semibold md:text-22-semibold lg:text-24-semibold md:leading-10 lg:leading-12 text-primary-blue-200"
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
    <>
      <div
        ref={ref}
        className="max-w-191.25 mx-auto  pt-16  md:pt-26  lg:pt-36   text-left text-16-regular md:text-22-regular md:leading-10 lg:leading-12 lg:text-24-regular leading-relaxed"
      >
        <div className="overflow-hidden">{processText()}</div>
      </div>
    </>
  );
}
