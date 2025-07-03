"use client";
import { useState } from "react";
import { Nutrition } from "@/data/nutritions";

export default function GroceryTable({ groceries }: { groceries: Nutrition[] }) {
  const [query, setQuery] = useState("");
  const filtered = query
    ? groceries.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : groceries;

  return (
    <div>
      <input
        type="text"
        placeholder="Pretraži..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Kalorije</th>
            <th>Proteini</th>
            <th>Ugljeni hidrati</th>
            <th>Masti</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.calories}</td>
              <td>{item.protein}</td>
              <td>{item.carbohydrates}</td>
              <td>{item.fats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}