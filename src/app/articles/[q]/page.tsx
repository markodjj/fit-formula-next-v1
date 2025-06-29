import { redirect } from "next/navigation";
import slugify from "slugify";
import { getAllNutritions, getNutritionBySlug } from "@/data/nutritions";

import { Metadata } from "next";
import { cache } from "react";
// Import your article fetching function here
// import { getArticleById } from "@/data/articles";

// ...existing imports...

export const revalidate = 86400; // Refresh cached pages once every 24 hours

// export async function generateStaticParams() {
//   const allNutritions = await getAllNutritions(); // or await if it's async
//   return allNutritions.map((nutrition) => ({
//     articleName: nutrition.name.toString(),
//   }));
// }

export async function generateStaticParams() {
  const allNutritions = await getAllNutritions();
  return allNutritions.map((nutrition) => ({
    q: slugify(nutrition.name, { lower: true, strict: true }),
  }));
}

const getNutrition = cache(getNutritionBySlug);

interface PageProps {
  params: Promise<{ q: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { q } = await params;
  const qDecoted = decodeURIComponent(q);
  // Fetch your article data here
  const nutrition = await getNutrition(qDecoted);

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
  const { q } = await params;
  const nutrition = getNutrition(q);

  if (!nutrition) {
    // Try to find a close match (fallback)
    const allNutritions = await getAllNutritions();
    const match = allNutritions.find((item) =>
      slugify(item.name, { lower: true, strict: true }).includes(q)
    );
    if (match) {
      // Redirect to the correct slug
      redirect(
        `/articles/${slugify(match.name, { lower: true, strict: true })}`
      );
    }
    // Optionally show 404
    return <div>Nutrition not found</div>;
  }

  return <div>{nutrition.name}</div>;
}
