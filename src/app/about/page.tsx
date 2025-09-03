import AboutBio from "@/components/domain/about/AboutBio";
import AboutCoreBeliefs from "@/components/domain/about/AboutCoreBeliefs";
import AboutHeadline from "@/components/domain/about/AboutHeadline";
import AboutMyExperience from "@/components/domain/about/AboutMyExperience";
import AboutTechStack from "@/components/domain/about/AboutTechStack";

export default function AboutPage() {
  return (
    <div className="pb-10 sm:pb-20">
      <AboutHeadline />
      <AboutBio />
      <AboutTechStack />
      <AboutMyExperience />
      <AboutCoreBeliefs />
    </div>
  );
}
