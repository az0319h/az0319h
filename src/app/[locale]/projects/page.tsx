import AllProjectsTab from "@/components/domain/projects/AllProjectsTab";
import PersonalProjectsTab from "@/components/domain/projects/PersonalProjectsTab";
import ProjectsTabNavigation from "@/components/domain/projects/ProjectsTabNavigation";
import SortSelector from "@/components/domain/projects/SortSelector";
import TeamProjectsTab from "@/components/domain/projects/TeamProjectsTab";
import { SortKey } from "@/utils";
import { redirect } from "next/navigation";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; sort?: SortKey }>;
}) {
  const { tab, sort } = await searchParams;
  const validSort: SortKey = sort === "oldest" ? "oldest" : "latest";

  if (!tab) redirect(`?tab=1&sort=${validSort}`);

  let content: React.ReactNode;
  switch (tab) {
    case "1":
      content = <AllProjectsTab sort={validSort} />;
      break;
    case "2":
      content = <TeamProjectsTab sort={validSort} />;
      break;
    case "3":
      content = <PersonalProjectsTab sort={validSort} />;
      break;
    default:
      redirect(`?tab=1&sort=${validSort}`);
  }

  return (
    <div>
      <ProjectsTabNavigation />
      <SortSelector currentTab={tab} currentSort={validSort} />
      {content}
    </div>
  );
}
