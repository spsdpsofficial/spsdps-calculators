import { buildManifest } from "@/lib/pwa/manifest";

export const dynamic = "force-static";

export default function manifest() {
  return buildManifest();
}
