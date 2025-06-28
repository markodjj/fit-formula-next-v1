import { getNutritionById, getAllNutritions } from "@/data/nutritions";

import { Metadata } from "next";
import { cache } from "react";
// Import your article fetching function here
// import { getArticleById } from "@/data/articles";

// ...existing imports...

export const revalidate = 86400; // Refresh cached pages once every 24 hours

export async function generateStaticParams() {
  const allNutritions = await getAllNutritions(); // or await if it's async
  return allNutritions.map((nutrition) => ({
    articleId: nutrition.id.toString(),
  }));
}

const getNutrition = cache(getNutritionById);

interface PageProps {
  params: Promise<{ articleId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { articleId } = await params;
  // Fetch your article data here
  const nutrition = await getNutrition(articleId);

  // Example fallback data:
  const article = {
    title: `Article ${nutrition?.name ?? "Unknown"}`,
    description: "This is a sample article description.",
  };

  return {
    title: article.title,
    description: article.description,
    // Optionally add more SEO fields here
  };
}

export default async function Page({ params }: PageProps) {
  const { articleId } = await params;
  const nutrition = getNutrition(articleId);
  return <div>{nutrition?.name}</div>;
}
