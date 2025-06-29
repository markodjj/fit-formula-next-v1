import { getAllNutritions } from "@/data/nutritions";
import slugify from "slugify";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allNutritions = await getAllNutritions();

  const nutritionPages = allNutritions.map((nutrition) => ({
    url: `${baseUrl}/articles/${slugify(nutrition.name, {
      lower: true,
      strict: true,
    })}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add other static pages if needed
    ...nutritionPages,
  ];
}
