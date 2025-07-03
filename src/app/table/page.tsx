import Link from "next/link";

interface category {
  name: string;
  path: string;
}

export default async function Page() {
  const categories = [
    { name: "Meso", path: "meso" },
    { name: "Žitarice", path: "zitarice" },
    { name: "Povrće", path: "povrce" },
    { name: "Voće", path: "voce" },
    { name: "Jaja", path: "jaja" },
    { name: "Riba", path: "riba" },
    { name: "Mlečni proizvodi", path: "mlecni-proizvodi" },
  ];

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
