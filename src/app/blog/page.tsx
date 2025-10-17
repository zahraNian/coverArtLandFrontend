import BlogCard from "@/components/blog/blog-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

async function fetchBlogs(page: number, pageSize: number) {
  // NOTE: Using fake data locally for now. When API is ready, restore the fetch below.
  // const res = await fetch(`,
  //   { cache: "no-store" }
  // );
  // if (!res.ok) throw new Error("Failed to fetch blogs");
  // return res.json();

  const TOTAL = 23;
  const all = Array.from({ length: TOTAL }).map((_, i) => {
    const id = (i + 1).toString();
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      id,
      slug: `mock-blog-${id}`,
      title: `Mock Blog Post ${id}`,
      coverImage: "/next.svg",
      excerpt:
        "This is a short excerpt for the mock blog post. It provides a quick summary to entice the reader to click through.",
      content:
        "Full content for mock blog post. Replace this with actual content when integrating the real API.",
      publishedAt: date.toISOString(),
    };
  });

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = all.slice(start, end);
  const totalPages = Math.max(1, Math.ceil(TOTAL / pageSize));

  return {
    items,
    pagination: { page, pageSize, total: TOTAL, totalPages },
  };
}

function pageNumbers(current: number, total: number) {
  const pages: (number | "...")[] = [];
  const delta = 1;
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  pages.push(1);
  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  if (total > 1) pages.push(total);

  return pages;
}

export default async function BlogPLPPage({ searchParams }: { searchParams?: { page?: string; pageSize?: string } }) {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const pageSize = Math.min(24, Math.max(1, Number(searchParams?.pageSize) || 9));

  const data = await fetchBlogs(page, pageSize);
  const { items, pagination } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="text-sm text-muted-foreground">{pagination.total} posts</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <BlogCard
            key={p.id}
            href={`/blog/${p.slug}`}
            title={p.title}
            imageSrc={p.coverImage}
            imageAlt={p.title}
            description={p.excerpt}
            date={p.publishedAt}
          />
        ))}
      </div>

      <div className="mt-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={pagination.page > 1 ? `/blog?page=${pagination.page - 1}&pageSize=${pagination.pageSize}` : undefined}
                aria-disabled={pagination.page <= 1}
                tabIndex={pagination.page <= 1 ? -1 : 0}
              />
            </PaginationItem>

            {pageNumbers(pagination.page, pagination.totalPages).map((p, idx) => (
              <PaginationItem key={`${p}-${idx}`}>
                {p === "..." ? (
                  <span className="px-3 py-2 text-sm">...</span>
                ) : (
                  <PaginationLink isActive={p === pagination.page}>
                    <Link href={`/blog?page=${p}&pageSize=${pagination.pageSize}`}>{p}</Link>
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={pagination.page < pagination.totalPages ? `/blog?page=${pagination.page + 1}&pageSize=${pagination.pageSize}` : undefined}
                aria-disabled={pagination.page >= pagination.totalPages}
                tabIndex={pagination.page >= pagination.totalPages ? -1 : 0}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
