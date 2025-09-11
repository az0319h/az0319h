import { readAdjacentProjects } from "@/api/readAdjacentProjects.action";
import { readProjectById } from "@/api/readProject.action";
import Shortcut from "@/components/domain/projects/Shortcut";
import { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdInsights } from "react-icons/md";

const positionOrder: Record<string, number> = {
  "Team Leader": 0,
  "Sub Leader": 1,
  "Team Member": 2,
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { tab } = await searchParams;
  const locale = (await getLocale()) as "en" | "ko";
  const t = await getTranslations("ProjectDetailMetaData");

  const data = await readProjectById(id);

  if (!data) notFound();

  const baseUrl = "https://madebyhshfolio.site";
  const currentUrl = `${baseUrl}/${locale}/projects/${id}${
    tab ? `?tab=${tab}` : "?tab=1"
  }`;

  return {
    title: `${data.title[locale]} - ${data.tagline[locale]}`,
    description: `${data.description[locale]}`,
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: `${data.title[locale]} - ${data.tagline[locale]}`,
      description: `${data.description[locale]}`,
      url: currentUrl,
      siteName: t("siteName"),
      images: [
        {
          url: `${data.projectImageUrl}`,
          width: 1200,
          height: 630,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title[locale]} - ${data.tagline[locale]}`,
      description: `${data.description[locale]}`,
      images: `${data.projectImageUrl}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const t = await getTranslations("ProjectsPage.detail");
  const locale = (await getLocale()) as "en" | "ko";
  const { id } = await params;
  const { tab } = await searchParams;
  const currentTab = (tab as "1" | "2" | "3") ?? "1";

  const data = await readProjectById(id);
  const adjacent = await readAdjacentProjects(id, currentTab);

  if (!data) notFound();
  return (
    <div>
      <div className="hidden w-40 lg:block lg:fixed top-1/2 left-0 z-30 -translate-y-1/2">
        {adjacent.prev && (
          <Link
            href={`/projects/${adjacent.prev.id}?tab=${currentTab}`}
            className="group block relative overflow-hidden"
          >
            <Image
              src={adjacent.prev.projectImageUrl}
              alt="projectImage"
              width={160}
              height={0}
              unoptimized
              priority
              className="transform -translate-x-5 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
            />
            <span className="absolute left-1/2 top-1/2 -translate-1/2 text-white text-14-medium  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {t("prev")}
            </span>
          </Link>
        )}
      </div>
      <div className="hidden w-40 lg:block lg:fixed top-1/2 -translate-y-1/2 right-0  z-30">
        {adjacent.next && (
          <Link
            href={`/projects/${adjacent.next.id}?tab=${currentTab}`}
            className="group block relative overflow-hidden"
          >
            <Image
              src={adjacent.next.projectImageUrl}
              alt="projectImage"
              width={160}
              height={0}
              unoptimized
              priority
              className="transform translate-x-5 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
            />
            <span className="absolute left-1/2 top-1/2 -translate-1/2 text-white text-14-medium  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {t("next")}
            </span>
          </Link>
        )}
      </div>
      <div className="max-w-185 mx-auto">
        <div className="flex  items-center justify-center  flex-col md:flex-row md:justify-between  md:items-center  mb-7">
          <div className="text-center md:text-left">
            <h2 className="text-22-bold md:text-24-bold mb-2">
              {data.title[locale]}
            </h2>
            <h3 className="text-14-regular md:text-18-regular">
              {data.tagline[locale]} | {data.platform[locale]}
            </h3>
          </div>
          <div className="pt-6">
            <Shortcut url={data.projectGitHubUrl} />
          </div>
        </div>
        <div className="mb-7 md:mb-10">
          <Link href={data.projectUrl} target="_blank">
            <Image
              src={data.projectImageUrl}
              alt="projectImageUrl"
              width={740}
              height={0}
              className="cursor-pointer shadow-image transition-all duration-300 ease-in-out hover:scale-101"
              unoptimized
            />
          </Link>
        </div>
        <div className="flex flex-col gap-7 md:gap-10 px-7 mb-10 md:mb-15 md:flex-row">
          <div>
            <h4 className="text-center md:text-left ">
              <span className="text-12-bold">{t("labels.about")}: </span>
              <em className="text-12-regular">{data.description[locale]}</em>
            </h4>
          </div>
          <div className="md:flex md:flex-col-reverse md:justify-between md:min-w-4/10">
            <h4 className="text-center md:text-left">
              <span className="text-12-bold">{t("labels.techStack")}: </span>
              {data.tags.map((tag, idx) => (
                <em key={idx} className="text-12-regular">
                  {tag}
                  {idx < data.tags.length - 1 && ", "}&nbsp;
                </em>
              ))}
            </h4>
            <h4 className="text-center md:text-left">
              <span className="text-12-bold">{t("labels.category")}: </span>
              <span className="text-12-regular">{data.category[locale]}</span>
            </h4>
          </div>
        </div>
        <div className="mb-10 md:mb-12">
          <h5 className="text-center text-16-semibold mb-7">
            {t("lighthouseTitle")}
          </h5>
          <ul className="flex  justify-center md:gap-12 gap-6 items-center md:[&_span]:text-14-semibold [&_span]:text-12-semibold [&_h4]:text-center  md:[&_h4]:text-14-regular [&_h4]:text-12-regular [&_li]:flex [&_li]:flex-col   [&_li]:items-center [&_li]:gap-0.5 md:[&_li]:gap-2">
            <li className="">
              <MdInsights size={40} className="md:size-12" />
              <h4>{t("score.performance")}</h4>
              <span>{data.performanceScore}/100</span>
            </li>
            <li className="">
              <MdInsights size={40} className="md:size-12" />
              <h4>{t("score.seo")}</h4>
              <span>{data.seoScore}/100</span>
            </li>
            <li>
              <MdInsights size={40} className="md:size-12" />
              <h4>{t("score.accessibility")}</h4>
              <span>{data.accessibilityScore}/100</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-bg-400 -mx-5 -mb-5 md:-mb-10 lg:-mb-14 lg:mx-[calc((100vw-1260px)/-2)]">
        <div className="max-w-310 mx-auto py-10 px-5 ">
          <h4 className="text-18-semibold md:text-20-semibold text-center mb-8 md:mb-10 ">
            {t("collaborators")}
          </h4>
          <ul className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 ">
            {Object.values(data.participants)
              .sort((a, b) => {
                const ai = positionOrder[a.position] ?? 999; // 없으면 맨 뒤로
                const bi = positionOrder[b.position] ?? 999;
                return ai - bi;
              })
              .map((p) => (
                <li
                  key={p.id}
                  className="relative [&_div]:transition-all [&_div]:duration-300 hover:[&_div]:shadow hover:[&_div]:bg-primary-white-100"
                >
                  <Link href={p.githubUrl as string} target="_blank">
                    <Image
                      src={p.imageUrl as string}
                      alt="collaborator"
                      width={96}
                      height={96}
                      unoptimized
                      className="absolute top-1/2 -translate-y-1/2"
                    />
                    <div className="ml-12 bg-bg-300 h-32 pl-17 pt-3 flex flex-col">
                      <h5 className="text-16-semibold md:text-18-semibold">
                        {p.name}
                      </h5>
                      <span className="text-12-regular md:text-14-regular">
                        {p.position}
                      </span>
                      <span className="flex-1 justify-end flex flex-col pb-3 text-10-regular md:text-12-regular">
                        {p.role}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
