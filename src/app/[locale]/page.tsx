import AppLink from "@/components/common/AppLink";
import ProjectCard from "@/components/common/ProjectCard";
import HeroBanner from "@/components/domain/home/HeroBanner";
import Image from "next/image";
import blog from "@/assets/images/blog.png";
import { readDeployProjectUrl } from "@/api/raedDeployProjectUrl.action";
import { getTranslations } from "next-intl/server";
import { readTeamProjects } from "@/api/readTeamProjects.action";
import { readPersonalProjects } from "@/api/readPersonalProjects.action";
import { readLatestProject } from "@/api/readLatestProject.action";
import HeroBannerWide from "@/components/domain/home/HeroBannerWide";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  const [latestProject, teamProjects, personalProjects, deployUrl] =
    await Promise.all([
      readLatestProject(),
      readTeamProjects(),
      readPersonalProjects(),
      readDeployProjectUrl(),
    ]);

  return (
    <div>
      <h1 className="lg:hidden text-center mb-3 md:mb-4   text-14-semibold md:text-16-semibold">
        {t("title")}
      </h1>
      {latestProject && (
        <>
          {/* 모바일용 */}
          <div className="block lg:hidden">
            <HeroBanner data={latestProject} />
          </div>

          {/* 데스크톱용 */}
          <div className="hidden lg:block">
            <HeroBannerWide data={latestProject} />
          </div>
        </>
      )}
      <div>
        <div className="relative z-10 py-14  md:py-16">
          <AppLink text={t("teamProjectLink")} href="/projects/?tab=2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-14">
          {teamProjects.map((data, idx) => (
            <div
              key={data.id}
              className={`
        ${idx >= 4 ? "hidden" : ""}   /* 기본적으로 4개까지만 */
        ${idx >= 3 ? "lg:hidden" : ""} /* lg 이상에서는 3개까지만 */
      `}
            >
              <ProjectCard data={data} currentTab="2" />
            </div>
          ))}
        </div>
        <div className="relative z-10 py-14 md:py-16">
          <AppLink text={t("personalProjectLink")} href="/projects/?tab=3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-14">
          {personalProjects.map((data, idx) => (
            <div
              key={data.id}
              className={`
        ${idx >= 4 ? "hidden" : ""}   /* 기본적으로 4개까지만 */
        ${idx >= 3 ? "lg:hidden" : ""} /* lg 이상에서는 3개까지만 */
      `}
            >
              <ProjectCard data={data} currentTab="3" />
            </div>
          ))}
        </div>
        <div className="relative z-10 pt-14 md:py-16 flex justify-center">
          <AppLink text={t("more")} href="/projects/" />
        </div>
      </div>
      {deployUrl ? (
        <div className="mx-auto bg-bg-300 w-fit hidden md:block">
          <a href={deployUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src={blog}
              alt="blog"
              width={716}
              className="shadow transition-opacity duration-300 hover:opacity-75"
              unoptimized
            />
          </a>
        </div>
      ) : (
        <div className="mx-auto bg-bg-300 w-fit hidden md:block">
          <Image
            src={blog}
            alt="blog"
            width={716}
            className="shadow"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
