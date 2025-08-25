"use client";

import { createProject } from "@/api/create-project.action";
import { useUser } from "@/context/UserContext";
import { useActionState, useEffect, useState } from "react";

type ParticipantUI = {
  id: string;
  name: string;
  role: string;
  githubUrl?: string;
  imageUrl?: string;
  createdAt: string;
};

export default function CreateProjectForm() {
  const { user, logout } = useUser();
  const [state, formData, isPending] = useActionState(createProject, null);

  // Admin 체크
  useEffect(() => {
    if (!user) return;
    if (user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      handleLogout();
    }
  }, [user]);

  useEffect(() => {
    if (!isPending && state) {
      if (state.success) {
        console.log(state.message);
        window.location.reload();
      } else {
        alert(state.message);
      }
    }
  }, [isPending, state]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  // Lighthouse 점수 상태
  const [performance, setPerformance] = useState(0);
  const [accessibility, setAccessibility] = useState(0);
  const [seo, setSeo] = useState(0);
  const overall = Math.round((performance + accessibility + seo) / 3);

  // 참여자 상태
  const [participants, setParticipants] = useState<ParticipantUI[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      role: "",
      githubUrl: "",
      imageUrl: "",
      createdAt: new Date().toISOString(),
    },
  ]);

  // 태그(텍스트) 상태: 쉼표로 구분해서 입력
  const [tagsText, setTagsText] = useState("");

  const addParticipant = () => {
    setParticipants((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        role: "",
        githubUrl: "",
        imageUrl: "",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const updateParticipant = (
    id: string,
    key: keyof ParticipantUI,
    value: string
  ) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    );
  };

  return (
    <div className="max-w-screen-md mx-auto [&_input]:text-14-regular [&_input]:md:text-16-regular [&_span]:block [&_span]:mb-1 [&_span]:text-12-regular [&_span]:md:text-14-regular">
      <h1 className="text-20-semibold md:text-24-semibold mb-6 md:mb-8">
        CREATE PROJECT
      </h1>

      <form action={formData}>
        {/* 기본 정보 */}
        <fieldset className="mb-8 p-4 border border-line-100 rounded-lg">
          <legend className="text-16-semibold md:text-18-semibold px-2">
            BASIC INFORMATION
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <label className="block">
              <span>PROJECT NAME</span>
              <input
                name="title"
                type="text"
                required
                className="w-full border border-line-100 rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span>TAGLINE</span>
              <input
                name="tagline"
                type="text"
                required
                className="w-full border border-line-100 rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span>LOCATION</span>
              <input
                name="location"
                type="text"
                required
                className="w-full border border-line-100 rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span>CATEGORY</span>
              <input
                name="category"
                type="text"
                required
                className="w-full border border-line-100 rounded px-3 py-2"
                placeholder="E.G., SERVICE, TRAVEL, OTHERS"
              />
            </label>
          </div>

          <label className="block mt-4">
            <span>DESCRIPTION</span>
            <textarea
              name="description"
              rows={3}
              className="text-14-regular md:text-16-regular w-full border border-line-100 rounded px-3 py-2"
            />
          </label>

          <label className="block mt-4">
            <span>PROJECT URL</span>
            <input
              name="projectUrl"
              type="url"
              required
              className="w-full border border-line-100 rounded px-3 py-2"
            />
          </label>

          <label className="block mt-4">
            <span>PROJECT IMAGE URL</span>
            <input
              name="projectImageUrl"
              type="url"
              required
              className="w-full border border-line-100 rounded px-3 py-2"
            />
          </label>

          <label className="block mt-4">
            <span>PROJECT GITHUB URL</span>
            <input
              name="projectGitHubUrl"
              type="url"
              required
              className="w-full border border-line-100 rounded px-3 py-2"
            />
          </label>
          {/* 태그: 텍스트로만, 쉼표로 구분 */}
          <label className="block mt-4">
            <span>TAGS</span>
            <input
              type="text"
              name="tags"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              className="w-full border border-line-100 rounded px-3 py-2"
              placeholder="E.G., NEXTJS, REACT, FIREBASE (SEPARATE WITH COMMAS)"
            />
          </label>
        </fieldset>

        {/* Lighthouse 점수 */}
        <fieldset className="mb-8 p-4 border border-line-100 rounded-lg">
          <legend className="text-16-semibold md:text-18-semibold px-2">
            LIGHTHOUSE SCORE
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <label className="block">
              <span>PERFORMANCE</span>
              <input
                name="performanceScore"
                type="number"
                min={0}
                max={100}
                value={performance}
                onChange={(e) => setPerformance(Number(e.target.value || 0))}
                className="w-full border border-line-100 rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span>ACCESSIBILITY</span>
              <input
                name="accessibilityScore"
                type="number"
                min={0}
                max={100}
                value={accessibility}
                onChange={(e) => setAccessibility(Number(e.target.value || 0))}
                className="w-full border border-line-100 rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span>SEO</span>
              <input
                name="seoScore"
                type="number"
                min={0}
                max={100}
                value={seo}
                onChange={(e) => setSeo(Number(e.target.value || 0))}
                className="w-full border border-line-100 rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span>OVERALL SCORE</span>
              <input
                name="overallScore"
                type="number"
                readOnly
                value={overall}
                className="w-full border border-line-100 rounded px-3 py-2 bg-gray-100"
              />
            </label>
          </div>
        </fieldset>

        {/* 참여자 */}
        <fieldset className="mb-8 p-4 border border-line-100 rounded-lg">
          <legend className="text-16-semibold md:text-18-semibold px-2">
            PARTICIPANTS
          </legend>

          <div className="space-y-6 mt-4">
            {participants.map((p) => (
              <div
                key={p.id}
                className="p-4 border border-white rounded-lg bg-black-100 text-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span>NAME</span>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) =>
                        updateParticipant(p.id, "name", e.target.value)
                      }
                      className="w-full border border-white rounded px-3 py-2"
                    />
                  </label>

                  <label className="block">
                    <span>ROLE</span>
                    <input
                      type="text"
                      value={p.role}
                      onChange={(e) =>
                        updateParticipant(p.id, "role", e.target.value)
                      }
                      className="w-full border border-white rounded px-3 py-2"
                      placeholder="E.G., DESIGNER, CREATIVE DIRECTOR"
                    />
                  </label>

                  <label className="block">
                    <span>GITHUB URL</span>
                    <input
                      type="url"
                      value={p.githubUrl}
                      onChange={(e) =>
                        updateParticipant(p.id, "githubUrl", e.target.value)
                      }
                      className="w-full border border-white rounded px-3 py-2"
                    />
                  </label>

                  <label className="block">
                    <span>IMAGE URL</span>
                    <input
                      type="url"
                      value={p.imageUrl}
                      onChange={(e) =>
                        updateParticipant(p.id, "imageUrl", e.target.value)
                      }
                      className="w-full border border-white rounded px-3 py-2"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => removeParticipant(p.id)}
                  className="mt-3 px-4 py-2 w-full text-12-semibold md:text-14-semibold"
                >
                  REMOVE PARTICIPANT
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addParticipant}
            className="mt-4 px-4 py-2 w-full text-18-semibold hover:text-hover-100 md:text-20-semibold"
          >
            ADD PARTICIPANT
          </button>

          {/* 서버로 넘길 JSON */}
          <input
            type="hidden"
            name="participants"
            value={JSON.stringify(participants)}
          />
        </fieldset>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 text-18-semibold hover:bg-hover-100 md:text-20-semibold bg-black-100 text-white rounded-3xl"
        >
          {isPending ? "PLEASE WAIT..." : "SUBMIT"}
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="text-12-medium md:text-14-medium text-center block w-full mt-4 md:mt-6 "
      >
        LOGOUT
      </button>
    </div>
  );
}
