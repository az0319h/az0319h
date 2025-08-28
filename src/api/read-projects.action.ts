"use server";

import { database } from "@/firebase/firebaseConfig";
import { ref, query, orderByChild, get } from "firebase/database";
import { ProjectPayload } from "@/types";

export async function readAllProjects(): Promise<ProjectPayload[]> {
  try {
    const projectsRef = ref(database, "projects");
    const q = query(projectsRef, orderByChild("createdAt"));

    const snapshot = await get(q);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();
    const projects = Object.values(data) as ProjectPayload[];

    return projects.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.error("readAllProjects error:", err);
    return [];
  }
}
