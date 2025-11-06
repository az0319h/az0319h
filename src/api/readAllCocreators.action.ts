"use server";

import { database } from "@/firebase/firebaseConfig";
import { get, ref } from "firebase/database";
import { Participant } from "@/types";

/**
 * 모든 프로젝트를 순회하며 참여자 목록을 가져옴
 * 중복 이름 또는 githubUrl 기준으로 중복 제거
 */
export async function readAllCocreators(): Promise<Participant[]> {
  const projectsRef = ref(database, "projects");
  const snapshot = await get(projectsRef);

  if (!snapshot.exists()) return [];

  const projects = snapshot.val();
  const allParticipants: Record<string, Participant> = {};

  Object.values(projects).forEach((project: any) => {
    if (!project.participants) return;

    Object.values(project.participants).forEach((p: any) => {
      const key = p.githubUrl || p.name;
      if (!allParticipants[key]) {
        allParticipants[key] = {
          id: p.id,
          name: p.name,
          githubUrl: p.githubUrl,
          imageUrl: p.imageUrl,
          role: p.role,
          position: p.position,
          createdAt: p.createdAt,
        };
      }
    });
  });

  return Object.values(allParticipants);
}
