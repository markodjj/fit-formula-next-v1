import nutritions from "./nutritions.json";

export interface Nutrition {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  category: string;
  type: string;
  macronutrient: string;
  tags?: string[]; // Add this line if your data includes tags
}

// Get all nutrition items
export function getAllNutritions(): Nutrition[] {
  return nutritions;
}

export function getNutritionById(id: string): Nutrition | undefined {
  const idNum = Number(id);
  return nutritions.find((item) => item.id === idNum);
}

// Search nutritions by name or tag
// export function searchNutritions(query: string): Nutrition[] {
//   const searchWords = query.toLowerCase().split(" ").filter(Boolean);
//   return nutritions.filter((item: Nutrition) =>
//     searchWords.every(
//       (word) =>
//         item.name.toLowerCase().includes(word) ||
//         item.tags.some((tag) => tag.toLowerCase().includes(word))
//     )
//   );
// }

// Get all unique tags (optionally limited)
// export function getAllTags(limit?: number): string[] {
//   const tags = nutritions.flatMap((item: Nutrition) => item.tags);
//   const uniqueTags = Array.from(new Set(tags));
//   return limit ? uniqueTags.slice(0, limit) : uniqueTags;
// }

export function searchNutritions(query: string): Nutrition[] {
  const searchWords = query.toLowerCase().split(" ").filter(Boolean);
  return nutritions.filter((item: Nutrition) =>
    searchWords.every(
      (word) =>
        item.name.toLowerCase().includes(word) ||
        (Array.isArray((item as Nutrition & { tags?: string[] }).tags) &&
          ((item as Nutrition & { tags?: string[] }).tags as string[]).some((tag: string) =>
            tag.toLowerCase().includes(word)
          ))
    )
  );
}

// Example: Get all categories
export function getAllCategories(): string[] {
  const categories = nutritions.map((item: Nutrition) => item.category);
  return Array.from(new Set(categories));
}
