import { NextResponse } from "next/server";

type Blog = {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  excerpt: string;
  content: string;
  publishedAt: string;
};

const TOTAL = 23;
const MOCK_BLOGS: Blog[] = Array.from({ length: TOTAL }).map((_, i) => {
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(24, Math.max(1, Number(searchParams.get("pageSize")) || 9));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const items = MOCK_BLOGS.slice(start, end);

  return NextResponse.json({
    items,
    pagination: {
      page,
      pageSize,
      total: TOTAL,
      totalPages: Math.max(1, Math.ceil(TOTAL / pageSize)),
    },
  });
}
