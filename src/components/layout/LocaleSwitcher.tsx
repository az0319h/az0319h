"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { HiMiniSlash } from "react-icons/hi2";

interface Props {
  onClose: () => void; // 메뉴 닫기용
}

export default function LocaleSwitcher({ onClose }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  const handleSwitch = (newLocale: string) => {
    if (newLocale === locale) return; // 이미 선택된 경우 아무 동작 X

    onClose();

    setTimeout(() => {
      const query = searchParams.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.push(url, { locale: newLocale });
    }, 1000);
  };

  return (
    <div className="mt-4 flex items-center gap-0.5 md:gap-1 text-16-semibold md:text-20-semibold">
      <button
        onClick={() => handleSwitch("en")}
        className={`transition-opacity duration-300 ${
          locale === "en" ? "opacity-100" : "opacity-50 hover:opacity-75"
        }`}
      >
        EN
      </button>
      <HiMiniSlash className="stroke-1" />
      <button
        onClick={() => handleSwitch("ko")}
        className={`transition-opacity duration-300 ${
          locale === "ko" ? "opacity-100" : "opacity-50 hover:opacity-75"
        }`}
      >
        KO
      </button>
    </div>
  );
}
