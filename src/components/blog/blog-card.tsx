import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

export type BlogCardProps = {
  href: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  description: string;
  date?: string | Date;
  className?: string;
  imgPriority?: boolean;
  imgSizes?: string;
  descMaxChars?: number; // fallback truncation without relying on line-clamp plugin
};

function formatDate(date?: string | Date) {
  if (!date) return "";
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function truncate(text: string, max = 140) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, Math.max(0, max - 1)).trimEnd() + "…";
}

export default function BlogCard({
  href,
  title,
  imageSrc,
  imageAlt = "",
  description,
  date,
  className,
  imgPriority = false,
  imgSizes = "(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw",
  descMaxChars = 140,
}: BlogCardProps) {
  const displayDate = formatDate(date);
  const desc = truncate(description, descMaxChars);

  return (
    <article
      className={clsx(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900",
        className,
      )}
    >
      <Link href={href} aria-label={title} className="relative block">
        <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ aspectRatio: "16 / 9" }}>
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes={imgSizes}
            priority={imgPriority}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {displayDate ? (
          <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={new Date(displayDate).toISOString()}>
            {displayDate}
          </time>
        ) : null}

        <h3 className="text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-gray-700 dark:text-gray-100 dark:group-hover:text-gray-300">
          <Link href={href} className="outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500">
            {title}
          </Link>
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>

        <div className="mt-auto" />
      </div>
    </article>
  );
}

