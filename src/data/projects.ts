import type { Project, ProjectCategory } from "@/types";

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "AI",
];

const image = (slug: string, alt: string) => ({
  src: `/images/projects/${slug}.svg`,
  alt,
  width: 1200,
  height: 800,
});

export const projects: Project[] = [
  {
    slug: "hnsc-survival-analysis-xai",
    name: "Cancer Survival Analysis with Explainable AI",
    category: "AI",
    industry: "Healthcare & Oncology",
    description:
      "An intelligent AI framework that predicts patient survival outcomes for cancer treatments using clinical data and Explainable AI (XAI) to provide clear, trusted reasoning behind every prediction.",
    service: "AI Solutions & Smart Tools",
    serviceId: "ai-based-systems",
    technologies: ["Explainable AI (XAI)", "Survival Prediction", "Clinical Data", "Machine Learning"],
    image: image("knowledge-assistant", "Cancer Survival Analysis using Explainable AI interface"),
    featured: true,
    isPlaceholder: false,
    projectUrl: "https://github.com/NabeelaKausar/HNSC-Survival-Alaysis-using-XAI",
  },
  {
    slug: "deep-learning-skin-cancer-classification",
    name: "Deep Learning Skin Cancer Classification",
    category: "AI",
    industry: "Healthcare & Diagnostics",
    description:
      "A high-precision deep learning ensemble model that accurately identifies and classifies multiple types of skin lesions from medical images with over 98% diagnostic accuracy.",
    service: "AI Solutions & Smart Tools",
    serviceId: "ai-based-systems",
    technologies: ["Deep Learning", "Medical Image AI", "Ensemble Models", "98%+ Accuracy"],
    image: image("workflow-agent", "Deep learning ensemble model for skin lesion diagnosis"),
    featured: true,
    isPlaceholder: false,
    projectUrl: "https://github.com/NabeelaKausar/Deep-Learning-based-Ensemble-Model-for-Skin-Cancer-Classification",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
