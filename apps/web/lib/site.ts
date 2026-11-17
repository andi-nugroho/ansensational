/**
 * Canonical site metadata. Override the public URL per environment with
 * NEXT_PUBLIC_SITE_URL (for example on a custom domain).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ansensational.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "ANSensational";

export const SITE_TITLE = "ANSensational — Production-ready project templates";

export const SITE_DESCRIPTION =
  "Discover and ansensational production-ready project templates from GitHub and GitLab. Browse by framework, copy one command, and start with a clean project.";

export const SITE_KEYWORDS = [
  "ansensational",
  "project templates",
  "ANSfolding",
  "boilerplate",
  "starter kit",
  "github templates",
  "gitlab templates",
  "nextjs template",
  "typescript starter",
  "cli ansfolding",
];

export const SOCIAL_IMAGE = {
  url: "/ansensational.png",
  width: 1200,
  height: 630,
  alt: "ANSensational — production-ready project templates",
};

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
