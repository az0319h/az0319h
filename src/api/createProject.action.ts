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

    // 다국어 필드
    const title = {
      en: String(formData.get("title_en") || "").trim(),
      ko: String(formData.get("title_ko") || "").trim(),
    };

    const tagline = {
      en: String(formData.get("tagline_en") || "").trim(),
      ko: String(formData.get("tagline_ko") || "").trim(),
    };

    const platform = {
      en: String(formData.get("platform_en") || "").trim(),
      ko: String(formData.get("platform_ko") || "").trim(),
    };

    const description = {
      en: String(formData.get("description_en") || "").trim(),
      ko: String(formData.get("description_ko") || "").trim(),
    };

    const category = {
      en: String(formData.get("category_en") || "").trim(),
      ko: String(formData.get("category_ko") || "").trim(),
    };
    // Project Image URLs (쉼표 구분)
    const projectImageUrlsRaw = String(
      formData.get("projectImageUrls") || ""
    ).trim();
    const projectImageUrls = projectImageUrlsRaw
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    // 단일 필드
    const projectUrl = String(formData.get("projectUrl") || "").trim();
    const projectGitHubUrl = String(
      formData.get("projectGitHubUrl") || ""
    ).trim();
    const projectImageUrl = String(
      formData.get("projectImageUrl") || ""
    ).trim();

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
            position: participant.position?.trim() ?? "",
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
      title, // { en, ko }
      tagline, // { en, ko }
      platform, // { en, ko }
      description, // { en, ko }
      category, // { en, ko }
      projectUrl,
      projectImageUrls,
      projectGitHubUrl,
      performanceScore,
      accessibilityScore,
      seoScore,
      overallScore,
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
