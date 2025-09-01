"use server";

import { readAllProjects } from "@/api/readAllProjects.action";
import { ProjectPayload } from "@/types";

function countParticipants(
  participants: ProjectPayload["participants"]
): number {
  if (!participants) return 0;
  if (Array.isArray(participants)) return participants.length;
  if (typeof participants === "object") return Object.keys(participants).length;
  return 0;
}

export async function readPersonalProjects(): Promise<ProjectPayload[]> {
  try {
    const all = await readAllProjects();
    return all.filter((p) => countParticipants(p.participants) < 2);
  } catch (err) {
    console.error("readPersonalProjects error:", err);
    return [];
  }
}
