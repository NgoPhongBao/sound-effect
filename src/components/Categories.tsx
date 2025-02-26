import clsx from "clsx";
import { Category } from "@/types";

export function Categories({
  className,
  categories,
}: {
  categories: Category[];
  className?: string;
}) {
  return (
    <section className={clsx("rounded-lg bg-white p-4 shadow-md", className)}>
      <h2 className="font-semibold uppercase">Danh mục</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className="rounded-full bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}
