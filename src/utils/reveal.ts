// src/utils/reveal.ts
export function revealStyle(
  isVisible: boolean,
  index = 0,
  step = 200 // 기본값 200ms
): React.CSSProperties {
  return {
    transition: "all 0.5s ease-out",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(16px)",
    transitionDelay: `${index * step}ms`,
  };
}
