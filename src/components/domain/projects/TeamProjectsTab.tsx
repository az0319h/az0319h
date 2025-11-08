import { readTeamProjects } from "@/api/readTeamProjects.action";
import ProjectCard from "@/components/common/ProjectCard";
import { SortKey, sortProjects } from "@/utils";
import { getTranslations } from "next-intl/server";

export default async function TeamProjectsTab({ sort }: { sort: SortKey }) {
  const datas = await readTeamProjects();
  const sorted = sortProjects(datas, sort);
  const t = await getTranslations("ProjectsPage");

  return (
    <>
      {sorted.length === 0 ? (
        <div className="text-center text-14-medium md:text-16-medium">
          {t("IsProject")}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-start justify-items-center lg:grid-cols-3 lg:gap-y-25">
          {sorted.map((data) => (
            <ProjectCard key={data.id} data={data} currentTab="2" />
          ))}
        </div>
      )}
    </>
  );
}
