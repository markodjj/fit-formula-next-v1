"use client";

import { useState } from "react";
import { Nutrition, searchNutritions } from "@/data/nutritions";
import ArticleListItem from "./ArticleListItem";

interface ArticleListProps {
  list: Nutrition[];
}

export default function ArticleList({ list }: ArticleListProps) {
  const [query, setQuery] = useState("");
  const filtered = query ? searchNutritions(query) : list;

  return (
    <div>
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 16, padding: 8, width: "100%" }}
      />
      {filtered.map((nutrition, idx) => (
        <div key={nutrition.id}>
          <ArticleListItem item={nutrition} />
        </div>
      ))}
    </div>
  );
}
