"use server";

import { database } from "@/firebase/firebaseConfig";
import { ref, query, orderByChild, limitToLast, get } from "firebase/database";
import { ProjectPayload } from "@/types";

export async function readLatestProject(): Promise<ProjectPayload | null> {
  try {
    const projectsRef = ref(database, "projects");
    // createdAt 기준으로 정렬하고 마지막 1개만 가져오기
    const q = query(projectsRef, orderByChild("createdAt"), limitToLast(1));

    const snapshot = await get(q);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.val();
    const projects = Object.values(data) as ProjectPayload[];

    return projects[0];
  } catch (err) {
    console.error("readLatestProject error:", err);
    return null;
  }
}
