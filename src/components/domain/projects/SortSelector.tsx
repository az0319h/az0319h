"use client";

import { SortKey } from "@/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface SortSelectorProps {
  currentTab: string;
  currentSort: SortKey;
}

export default function SortSelector({
  currentTab,
  currentSort,
}: SortSelectorProps) {
  const router = useRouter();
  const t = useTranslations("Sort");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortKey;
    router.push(`?tab=${currentTab}&sort=${newSort}`);
  };

  return (
    <div className="flex justify-end mb-6 sm:mb-10">
      <div className="relative inline-block">
        <select
          value={currentSort}
          onChange={(e) => {
            handleChange(e);
            e.target.blur();
          }}
          className="
        appearance-none
        px-4 py-2.5 pr-10
        text-14-medium
        rounded-lg
        bg-white 
        border border-gray-200 
        dark:text-gray-100
        shadow-sm
        hover:border-gray-400 
        transition-all duration-200
        cursor-pointer
      "
        >
          <option value="latest">{t("latest")}</option>
          <option value="oldest">{t("oldest")}</option>
        </select>

        {/* ▼ 커스텀 화살표 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
