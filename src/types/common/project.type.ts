export interface Participant {
  id: string;
  name: string;
  role: string;
  githubUrl?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface ProjectPayload {
  id: string;
  createdAt: string;
  title: string;
  tagline: string;
  location: string;
  description: string;
  projectUrl: string;
  projectImageUrl: string;
  projectGitHubUrl: string;
  performanceScore: number;
  accessibilityScore: number;
  seoScore: number;
  overallScore: number;
  category: string;
  tags: string[];
  participants: Record<string, Participant> | Participant[];
}
