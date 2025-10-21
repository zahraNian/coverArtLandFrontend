import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About Us – Coverartland",
  description:
    "Coverartland bridges the gap between music and visual art with exclusive, high-quality cover designs tailored to artists, producers, and labels.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us – Coverartland",
    description:
      "We design and curate exclusive, high-quality music cover artworks that give sound a face and help artists tell their visual story.",
    type: "website",
    url: "/about-us",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us – Coverartland",
    description:
      "Coverartland: where sound meets vision. High-quality music cover designs for artists, producers, and labels.",
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className="border-b bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-4 py-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">About Us</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">About Us – Coverartland</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Where sound meets vision. We craft cover artworks that give your music a visual identity.
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <article className="lg:col-span-2">
              <p className="text-base leading-7 text-foreground">
                It was a sunny summer day! We’ve been searching for domains that fit for our design business and we’ve found Coverartland! We liked it and here we are! Full of passion!
              </p>

              <h2 id="what-we-believe" className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight">What We Believe</h2>
              <p className="mt-3 text-base leading-7 text-foreground">
                At Coverartland, we believe in art! We believe that music is more than sounds — it’s emotion, identity, and storytelling, just like every other art! Every melody carries a message, and every message deserves a visual world that reflects its soul. That’s where we come in.
              </p>

              <h2 id="our-mission" className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight">Our Mission</h2>
              <p className="mt-3 text-base leading-7 text-foreground">
                Coverartland was created with one simple idea: to bridge the gap between music and visual art. Our mission is to help artists, producers, and creators give their sound a face — a visual expression that captures the essence of who they are and what their music stands for.
              </p>

              <h2 id="what-we-do" className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight">What We Do</h2>
              <p className="mt-3 text-base leading-7 text-foreground">
                We design and curate exclusive, high-quality music cover artworks across a wide variety of styles, moods, and genres — from minimal and elegant, to dark and cinematic, to colorful and surreal. Every piece is crafted with care, creativity, and deep artistic understanding by a collective of talented visual designers who live and breathe music culture.
              </p>

              <h2 id="who-we-serve" className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight">Who We Serve</h2>
              <p className="mt-3 text-base leading-7 text-foreground">
                Whether you’re an independent artist releasing your first single, a producer seeking a cohesive visual identity, or a label looking for consistent, eye-catching cover designs — Coverartland provides ready-to-use and custom-made artworks that elevate your sound.
              </p>

              <h2 id="why-it-matters" className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight">Why It Matters</h2>
              <p className="mt-3 text-base leading-7 text-foreground">
                We believe in the power of first impressions. A cover is often the first thing your audience sees before they even hear your track. That’s why we put so much heart into every design — so your music not only sounds amazing, but also looks unforgettable.
              </p>

              <h2 id="our-vision" className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight">Our Vision</h2>
              <p className="mt-3 text-base leading-7 text-foreground">
                Beyond just selling covers, we aim to build a creative community where music and art inspire each other. Our vision is to empower artists worldwide to express their stories visually, connect emotionally with their listeners, and stand out in an ever-growing digital landscape.
              </p>

              <p className="mt-3 text-base leading-7 text-foreground">
                Welcome to Coverartland — where sound meets vision, and every song finds its face.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/blog" className="inline-flex items-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                  Read our blog
                </Link>
                <Link href="/" className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
                  Explore covers
                </Link>
              </div>
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">In this page</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#what-we-believe" className="hover:underline">What We Believe</a></li>
                  <li><a href="#our-mission" className="hover:underline">Our Mission</a></li>
                  <li><a href="#what-we-do" className="hover:underline">What We Do</a></li>
                  <li><a href="#who-we-serve" className="hover:underline">Who We Serve</a></li>
                  <li><a href="#why-it-matters" className="hover:underline">Why It Matters</a></li>
                  <li><a href="#our-vision" className="hover:underline">Our Vision</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Script id="ld-json-organization" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Coverartland",
          url: "https://www.coverartland.com",
          sameAs: [
            "https://www.instagram.com/",
            "https://x.com/"
          ]
        })}
      </Script>
      <Script id="ld-json-webpage" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "About Us – Coverartland",
          url: "https://www.coverartland.com/about-us",
          description:
            "Coverartland bridges the gap between music and visual art with exclusive, high-quality cover designs tailored to artists, producers, and labels.",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.coverartland.com/" },
              { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.coverartland.com/about-us" }
            ]
          }
        })}
      </Script>
    </main>
  );
}