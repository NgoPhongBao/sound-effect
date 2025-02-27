import clsx from "clsx";
import { Category } from "@/types";
import Link from "next/link";

export function Categories({
  className,
  categories,
}: {
  categories: Category[];
  className?: string;
}) {
  return (
    <section className={clsx("rounded-lg bg-white p-4 shadow-md", className)}>
      <h2 className="font-semibold uppercase">Thể loại</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/the-loai/${category.id}`}
            className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
