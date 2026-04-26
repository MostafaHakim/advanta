import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CTASection from "@/components/sections/CTASection";
import StatsSection from "@/components/sections/StatsSection";
import { TeamSection } from "@/components/sections";
import FeatureProject from "@/components/sections/FeatureProject";
import dbConnect from "@/lib/db";
import Hero from "@/models/heroModel";
import Brand from "@/models/brandModel";
import Project from "@/models/projectModel";
import TeamMember from "@/models/teamModel";
import { SectionWrapper, FadeInWrapper, SpringWrapper } from "@/components/home/SectionWrapper";

async function getData() {
  try {
    await dbConnect();
    
    // Fetch all data in parallel
    const [heroData, brands, projects, team] = await Promise.all([
      Hero.find({}).lean(),
      Brand.find().sort({ createdAt: -1 }).lean(),
      Project.find({ featured: true }).sort({ createdAt: -1 }).lean(),
      TeamMember.find().sort({ featured: -1, createdAt: -1 }).lean()
    ]);

    return {
      heroData: { success: true, data: JSON.parse(JSON.stringify(heroData)) },
      brands: JSON.parse(JSON.stringify(brands)),
      projects: JSON.parse(JSON.stringify(projects)),
      team: JSON.parse(JSON.stringify(team))
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      heroData: { success: false, data: [] },
      brands: [],
      projects: [],
      team: []
    };
  }
}

export default async function Home() {
  const { heroData, brands, projects, team } = await getData();

  return (
    <>
      {/* Hero with special animation */}
      <FadeInWrapper>
        <HeroSection initialData={heroData} />
      </FadeInWrapper>

      {/* Stats with staggered animation */}
      <SectionWrapper delay={0.1}>
        <StatsSection initialBrands={brands} />
      </SectionWrapper>

      {/* Services with fadeInUp */}
      <SectionWrapper delay={0.2}>
        <ServicesSection />
      </SectionWrapper>

      {/* Portfolio with fadeInUp */}
      <SectionWrapper delay={0.4}>
        <FeatureProject initialProjects={projects} />
      </SectionWrapper>

      {/* Team with fadeIn */}
      <SectionWrapper variant="fadeIn" delay={0.3}>
        <TeamSection initialTeam={team} />
      </SectionWrapper>

      {/* CTA with special attention */}
      <SpringWrapper delay={0.3}>
        <CTASection />
      </SpringWrapper>
    </>
  );
}
