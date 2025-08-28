"use server";

import { database } from "@/firebase/firebaseConfig";
import { ref, get } from "firebase/database";

export async function readDeployProjectUrl(): Promise<string | null> {
  try {
    const urlRef = ref(database, "deployUrl");
    const snapshot = await get(urlRef);

    if (!snapshot.exists()) {
      return null;
    }

    const deployUrl = snapshot.val() as string;
    return deployUrl;
  } catch (err) {
    console.error("readDeployProjectUrl error:", err);
    return null;
  }
}
