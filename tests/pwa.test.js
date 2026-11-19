import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { OFFLINE_PATH, SW_PATH } from "@/lib/pwa/config";
import { buildManifest } from "@/lib/pwa/manifest";
import { getToolById, isLive } from "@/lib/tools";
import sitemap from "@/app/sitemap";

const root = path.resolve(__dirname, "..");
const publicFile = (p) => readFileSync(path.join(root, "public", p));

/** Width and height from a PNG's IHDR chunk. */
function pngSize(buffer) {
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

describe("web app manifest", () => {
  const manifest = buildManifest();
  it("has the fields browsers need to offer installation", () => {
    expect(manifest).toMatchObject({ display: "standalone", scope: "/", start_url: "/?source=pwa", lang: "en-IN" });
    expect(manifest.name.length).toBeGreaterThan(0);
    expect(manifest.short_name.length).toBeLessThanOrEqual(12);
    expect(manifest.theme_color).toMatch(/^#[0-9a-f]{6}$/i);
    expect(manifest.background_color).toBe("#ffffff");
  });
  it("lists 192, 512 and maskable icons whose files exist and have the declared size", () => {
    const sizes = manifest.icons.map((i) => i.sizes);
    expect(sizes).toEqual(expect.arrayContaining(["192x192", "512x512"]));
    expect(manifest.icons.some((i) => i.purpose === "maskable")).toBe(true);
    for (const icon of manifest.icons) {
      const { width, height } = pngSize(publicFile(icon.src));
      expect(`${width}x${height}`).toBe(icon.sizes);
    }
    expect(pngSize(publicFile("icons/apple-touch-icon.png"))).toEqual({ width: 180, height: 180 });
  });
  it("shortcuts point at live tools only", () => {
    expect(manifest.shortcuts.length).toBeGreaterThan(0);
    for (const s of manifest.shortcuts) expect(s.url).toMatch(/^\/[a-z-]+\/[a-z-]+\/\?source=pwa$/);
  });
});

describe("service worker", () => {
  const sw = publicFile("sw.js").toString("utf8");
  it("uses the same offline URL as the app config and is served from the site root", () => {
    expect(sw).toContain(`const OFFLINE_URL = "${OFFLINE_PATH}"`);
    expect(SW_PATH).toBe("/sw.js");
  });
  it("only handles same-origin GET requests", () => {
    expect(sw).toContain('request.method !== "GET"');
    expect(sw).toContain("url.origin !== self.location.origin");
  });
  it("is a plain script with no imports, remote code or eval", () => {
    expect(sw).not.toMatch(/importScripts|eval\(|new Function|https?:\/\//);
  });
});

describe("offline page and headers", () => {
  it("is excluded from the sitemap", () => {
    expect(sitemap().some((entry) => entry.url.includes("/offline"))).toBe(false);
  });
  it("sw.js is never cached by the browser", () => {
    const headers = publicFile("_headers").toString("utf8");
    expect(headers).toMatch(/\/sw\.js\n\s+Cache-Control: no-cache/);
  });
  it("the offline page exists", () => {
    expect(readFileSync(path.join(root, "app/offline/page.js"), "utf8")).toContain("noindex: true");
  });
});

describe("shortcut tool ids", () => {
  it("exist in the catalogue and are live", () => {
    for (const s of buildManifest().shortcuts) expect(s.name.length).toBeGreaterThan(0);
    expect(isLive(getToolById("finance/emi-calculator"))).toBe(true);
  });
});
