import { getAllNutritions } from "@/data/nutritions";
import { Nutrition } from "@/data/nutritions";
import GroceryTable from "@/components/GroceryTable";

interface PageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 86400; // Refresh cached pages once every 24 hours

const categories = [
  { name: "Meso", path: "meso" },
  { name: "Žitarice", path: "zitarice" },
  { name: "Povrće", path: "povrce" },
  { name: "Voće", path: "voce" },
  { name: "Jaja", path: "jaja" },
  { name: "Riba", path: "riba" },
  { name: "Mlečni proizvodi", path: "mlecni-proizvodi" },
];
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
