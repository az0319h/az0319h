"use server";

import { database } from "@/firebase/firebaseConfig";
import {
  FailResult,
  Participant,
  ProjectPayload,
  SuccessResult,
} from "@/types";
import { ref, set } from "firebase/database";

type ActionResult = SuccessResult | FailResult;

export async function createProject(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    // 기본 필드
    const title = String(formData.get("title") || "").trim();
    const tagline = String(formData.get("tagline") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const projectUrl = String(formData.get("projectUrl") || "").trim();
    const projectGitHubUrl = String(
      formData.get("projectGitHubUrl") || ""
    ).trim();
    const projectImageUrl = String(
      formData.get("projectImageUrl") || ""
    ).trim();

    const category = String(formData.get("category") || "").trim();

    // 태그
    const tagsRaw = String(formData.get("tags") || "");
    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // 점수
    const performanceScore = Number(formData.get("performanceScore") || 0);
    const accessibilityScore = Number(formData.get("accessibilityScore") || 0);
    const seoScore = Number(formData.get("seoScore") || 0);
    const overallScore = Math.round(
      (performanceScore + accessibilityScore + seoScore) / 3
    );

    // 참여자
    const participantsRaw = String(formData.get("participants") || "[]");
    let participants: Record<string, Participant> = {};
    try {
      const parsed = JSON.parse(participantsRaw);
      if (Array.isArray(parsed)) {
        parsed.forEach((p) => {
          const participant = p as Partial<Participant>;
          const pid = participant.id ?? crypto.randomUUID();

          participants[String(pid)] = {
            id: String(pid),
            name: String(participant.name ?? "").trim(),
            role: String(participant.role ?? "").trim(),
            githubUrl: participant.githubUrl?.trim() ?? "",
            imageUrl: participant.imageUrl?.trim() ?? "",
            createdAt: participant.createdAt ?? createdAt,
          };
        });
      }
    } catch {
      participants = {};
    }

    // payload
    const payload: ProjectPayload = {
      id,
      createdAt,
      title,
      tagline,
      location,
      description,
      projectUrl,
      projectImageUrl,
      projectGitHubUrl,
      performanceScore,
      accessibilityScore,
      seoScore,
      overallScore,
      category,
      tags,
      participants,
    };

    // DB 저장
    const projectRef = ref(database, `projects/${id}`);
    await set(projectRef, payload);

    return {
      success: true,
      message: "The project has been successfully created.",
    };
  } catch (err: unknown) {
    console.error("createProject error:", err);

    let errorMessage = "An unknown error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return {
      success: false,
      message: "Project creation failed: " + errorMessage,
    };
  }
}
