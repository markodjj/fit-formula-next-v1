"use client";
import slugify from "slugify";
import { Nutrition } from "@/data/nutritions";
import Link from "next/link";

interface ArticleItemProps {
  item: Nutrition;
}

export default function ArticleListItem({ item }: ArticleItemProps) {
  const slug = slugify(item.name, { lower: true, strict: true });

  return (
    <div>
      <Link href={`/articles/${slug}`}> {item.name}</Link>
    </div>
  );
}
