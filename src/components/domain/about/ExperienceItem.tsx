import Link from "next/link";

interface ExperienceItemProps {
  title: string; // h3 제목
  company: string; // 회사명 (링크 텍스트)
  companyUrl: string; // 회사 링크
  period: string; // 기간
}

export default function ExperienceItem({
  title,
  company,
  companyUrl,
  period,
}: ExperienceItemProps) {
  return (
    <li className="my-border flex items-center justify-between gap-6 py-5 md:py-6">
      <div className="flex flex-col gap-2 md:gap-3">
        <h3 className="text-18-regular sm:text-20-regular md:text-24-regular lg:text-28-regular sm:leading-7 md:leading-9 lg:leading-10">
          {title}
        </h3>
        <Link
          href={companyUrl}
          target="_blank"
          className="w-fit text-primary-blue-200 text-14-medium sm:text-16-medium lg:text-18-medium"
        >
          {company}
        </Link>
      </div>
      <span className="text-12-regular sm:text-14-regular lg:text-16-regular md:text-nowrap">
        {period}
      </span>
    </li>
  );
}
