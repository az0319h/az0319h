export interface Participant {
  id: string;
  name: string;
  role: string;
  position: string;
  githubUrl?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface ProjectPayload {
  id: string;
  createdAt: string;
  title: { en: string; ko: string };
  tagline: { en: string; ko: string };
  platform: { en: string; ko: string };
  description: { en: string; ko: string };
  category: { en: string; ko: string };
  projectUrl: string;
  projectImageUrl: string;
  projectGitHubUrl: string;
  performanceScore: number;
  accessibilityScore: number;
  seoScore: number;
  overallScore: number;
  tags: string[];
  participants: Record<string, Participant> | Participant[];
}
