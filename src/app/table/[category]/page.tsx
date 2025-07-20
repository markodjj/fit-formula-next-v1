import { getAllNutritions } from "@/data/nutritions";
import { Nutrition } from "@/data/nutritions";
import GroceryTable from "@/components/GroceryTable";
import { categories } from "@/data/categories";

interface PageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 86400; // Refresh cached pages once every 24 hours

// Generate static paths for all categories
export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.path,
  }));
}
// Generate metadata for each category page
export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  //const category = params.category.replace(/-/g, " ");
  return {
    title: `Namirnice za kategoriju: ${category}`,
    description: `Tabela namirnica za kategoriju ${category}.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  const all = await getAllNutritions();
  const groceries = all.filter(
    (item: Nutrition) =>
      item.category.toLowerCase().replace(/\s/g, "-") === category
  );

  return <GroceryTable groceries={groceries} />;
}
