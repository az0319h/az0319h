"use client";

import { useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { id: "1", label: "A L L\u00A0\u00A0\u00A0P R O J E C T S" },
  { id: "2", label: "T E A M\u00A0\u00A0\u00A0P R O J E C T S" },
  { id: "3", label: "P E R S O N A L\u00A0\u00A0\u00A0P R O J E C T S" },
];

export default function ProjectsTabNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "1";

  const handleTabClick = (id: string) => {
    router.push(`?tab=${id}`);
  };

  return (
    <div className="mb-12 md:mb-16 lg:mb-20 flex gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-3 flex-wrap justify-center text-14-semibold md:text-16-semibold">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`relative
          ${
            currentTab === tab.id
              ? "after:absolute after:left-0 after:bottom-0 after:h-0.25 after:w-full after:bg-black-100"
              : "opacity-80"
          }
      `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
