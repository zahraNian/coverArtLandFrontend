import Link from "next/link";

export default function NoDataFound({
  title = "No results found",
  description = "",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="w-full rounded-xl border border-black/10 bg-white p-6 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-black/60">{description}</p>
    </div>
  );
}
