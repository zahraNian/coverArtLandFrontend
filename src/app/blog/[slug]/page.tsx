import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BaseApiService } from "@/lib/api";

type BlogPost = {
    id: string | number;
    slug: string;
    title: string;
    coverImage?: string;
    excerpt?: string;
    content?: string; // assumed HTML from API; adjust if markdown/plain
    publishedAt?: string; // ISO
    author?: { name?: string; avatar?: string } | null;
    tags?: string[];
};

async function fetchPost(slug: string): Promise<BlogPost | null> {
    const api = new BaseApiService({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
    try {
        // Adjust endpoint if your API differs (e.g., "/posts/slug/" or query param)
        const post = await api.get<BlogPost>(`/blogs/${slug}`, { cache: "no-store" });
        return post ?? null;
    } catch (e) {
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await fetchPost(params.slug);
    if (!post) return { title: "Blog Post", description: "Blog post" };

    const title = post.title || "Blog Post";
    const description = post.excerpt || (post.content ? post.content.replace(/<[^>]+>/g, "").slice(0, 160) : "");
    const url = `/blog/${post.slug}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: "article",
            images: post.coverImage ? [{ url: post.coverImage }] : undefined,
        },
    };
}

export default async function BlogPDPPage({ params }: { params: { slug: string } }) {
    const post = await fetchPost(params.slug);
    if (!post) notFound();

    const date = post.publishedAt ? new Date(post.publishedAt) : null;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        datePublished: post.publishedAt,
        author: post.author?.name ? { "@type": "Person", name: post.author.name } : undefined,
        image: post.coverImage,
        url: `/blog/${post.slug}`,
    };

    return (
        <main className="pb-20">
            <div className="max-w-frame mx-auto px-4 xl:px-0">
                <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
                <nav className="mb-4 text-sm text-black/60">
                    <Link href="/blog" className="underline">Blog</Link>
                    <span> / </span>
                    <span className="text-black/70">{post.title}</span>
                </nav>

                <header className="mb-6 sm:mb-8">
                    <h1 className="text-2xl md:text-[32px] font-bold">{post.title}</h1>
                    <div className="mt-2 flex items-center gap-3 text-sm text-black/60">
                        {post.author?.name && <span>By {post.author.name}</span>}
                        {date && (
                            <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time>
                        )}
                        {post.tags && post.tags.length > 0 && (
                            <span className="hidden sm:inline">• {post.tags.slice(0, 3).join(", ")}</span>
                        )}
                    </div>
                </header>

                {post.coverImage && (
                    <div className="mb-6 overflow-hidden rounded-xl border border-black/10">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={1200}
                            height={630}
                            className="h-auto w-full object-cover"
                            priority
                        />
                    </div>
                )}

                <article className="prose prose-slate max-w-none">
                    {post.content ? (
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    ) : (
                        post.excerpt && <p>{post.excerpt}</p>
                    )}
                </article>

                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </div>
        </main>
    );
}
