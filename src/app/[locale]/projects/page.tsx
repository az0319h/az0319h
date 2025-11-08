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

  // ✅ 네 가지 정렬 옵션 중 하나만 허용
  const validSort: SortKey =
    sort === "oldest" || sort === "completed" || sort === "inProgress"
      ? sort
      : "latest";

  // tab이 없을 경우 기본값 지정
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
