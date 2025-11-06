"use server";

import { database } from "@/firebase/firebaseConfig";
import { get, ref } from "firebase/database";
import { Participant, ProjectPayload } from "@/types";

/**
 * 모든 프로젝트를 순회하며 참여자 목록을 가져옴
 * 중복 이름 또는 githubUrl 기준으로 중복 제거
 */
export async function readAllCocreators(): Promise<Participant[]> {
  const projectsRef = ref(database, "projects");
  const snapshot = await get(projectsRef);

  if (!snapshot.exists()) return [];

  const projects: Record<string, ProjectPayload> = snapshot.val();
  const allParticipants: Record<string, Participant> = {};

  Object.values(projects).forEach((project) => {
    if (!project.participants) return;

    Object.values(project.participants).forEach((p) => {
      const participant = p as Participant;
      const key = participant.githubUrl || participant.name;
      if (!allParticipants[key]) {
        allParticipants[key] = {
          id: participant.id,
          name: participant.name,
          githubUrl: participant.githubUrl,
          imageUrl: participant.imageUrl,
          role: participant.role,
          position: participant.position,
          createdAt: participant.createdAt,
        };
      }
    });
  });

  return Object.values(allParticipants);
}
