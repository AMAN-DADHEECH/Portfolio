import { portfolioData, Project, SkillCategory, Experience } from "@/data/portfolioData";

export const portfolioService = {
  getPersonalData: () => portfolioData.personal,

  getSkills: (): SkillCategory[] => portfolioData.skills,

  getFeaturedProjects: (): Project[] => 
    portfolioData.projects.filter((project) => project.featured),

  getAllProjects: (): Project[] => portfolioData.projects,

  getProjectsByCategory: (category: string): Project[] => {
    if (category === "All") return portfolioData.projects;
    return portfolioData.projects.filter((project) => project.category === category);
  },

  getExperiences: (): Experience[] => portfolioData.experience,

  getEducation: () => portfolioData.education,

  getProjectById: (id: string): Project | undefined =>
    portfolioData.projects.find((p) => p.id === id),
};
