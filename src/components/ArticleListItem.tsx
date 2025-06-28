"use client";

import { Nutrition } from "@/data/nutritions";
import Link from "next/link";

interface ArticleItemProps {
  item: Nutrition;
}

export default function ArticleListItem({ item }: ArticleItemProps) {
  return (
    <div>
      <Link href={`/articles/${item.id}`}> {item.name}</Link>
    </div>
  );
}
