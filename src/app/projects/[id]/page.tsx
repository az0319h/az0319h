import { readProjectById } from "@/api/read-project.action";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await readProjectById(id);
  if (!data) notFound();
  return <div>{data.title}</div>;
}
