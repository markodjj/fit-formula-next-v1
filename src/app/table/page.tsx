import Link from "next/link";
import { categories } from "@/data/categories";

interface category {
  name: string;
  path: string;
}

export default async function Page() {
  return (
    <div>
      {categories.map((category: category) => (
        <Link key={category.name} href={`/table/${category.path}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
