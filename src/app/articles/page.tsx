import ArticleList from "@/components/ArticleList";
import { getAllNutritions } from "@/data/nutritions";

export default async function Page() {
  const nutritions = getAllNutritions();

  return (
    <div>
      <ArticleList list={nutritions} />
    </div>
  );
}
