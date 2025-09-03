import AboutBio from "@/components/domain/about/AboutBio";
import AboutHeadline from "@/components/domain/about/AboutHeadline";
import AboutMyExperience from "@/components/domain/about/AboutMyExperience";
import AboutTechStack from "@/components/domain/about/AboutTechStack";

export default function AboutPage() {
  return (
    <div>
      <AboutHeadline />
      <AboutBio />
      <AboutTechStack />
      <AboutMyExperience />
    </div>
  );
}
