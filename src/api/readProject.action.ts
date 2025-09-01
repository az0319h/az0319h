"use server";

import { database } from "@/firebase/firebaseConfig";
import { ref, get } from "firebase/database";
import type { ProjectPayload } from "@/types";

export async function readProjectById(
  id: string
): Promise<ProjectPayload | null> {
  try {
    const safeId = String(id || "").trim();
    if (!safeId) return null;

    const snap = await get(ref(database, `projects/${safeId}`));
    if (!snap.exists()) return null;

    return snap.val() as ProjectPayload;
  } catch (err) {
    console.error("readProjectById error:", err);
    return null;
  }
}
