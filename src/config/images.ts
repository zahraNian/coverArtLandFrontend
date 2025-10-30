export const ASSET_BASE = (process.env.NEXT_PUBLIC_ASSETS_BASE || "https://c446532.parspack.net/c446532").replace(/\/$/, "");

export function assetUrl(key?: string): string {
  if (!key) return "";
  if (/^https?:\/\//i.test(key)) return key;
  return `${ASSET_BASE}/${String(key).replace(/^\//, "")}`;
}
