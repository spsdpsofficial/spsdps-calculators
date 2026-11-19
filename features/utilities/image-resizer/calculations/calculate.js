export const MAX_SIDE = 10000;
export const MAX_PIXELS = 50_000_000;
export const MAX_FILE_BYTES = 25 * 1024 * 1024;

export const FORMATS = [
  { id: "jpeg", label: "JPEG (smaller photos)", mime: "image/jpeg", extension: "jpg", lossy: true },
  { id: "png", label: "PNG (sharp, transparent)", mime: "image/png", extension: "png", lossy: false },
  { id: "webp", label: "WebP (small and modern)", mime: "image/webp", extension: "webp", lossy: true },
];

/** With the aspect ratio locked, change one side and work out the other. `changed` is "width" or "height". */
export function linkedDimensions({ originalWidth, originalHeight, value, changed }) {
  if (changed === "width") return { width: value, height: Math.max(1, Math.round((value * originalHeight) / originalWidth)) };
  return { width: Math.max(1, Math.round((value * originalWidth) / originalHeight)), height: value };
}

/** Size after scaling by a percentage. */
export function scaledDimensions({ originalWidth, originalHeight, percent }) {
  return {
    width: Math.max(1, Math.round((originalWidth * percent) / 100)),
    height: Math.max(1, Math.round((originalHeight * percent) / 100)),
  };
}

/** Check requested output dimensions. Returns an error string or null. */
export function validateDimensions(width, height) {
  if (![width, height].every((n) => Number.isInteger(n) && n >= 1)) return "Width and height must be whole numbers of at least 1 pixel.";
  if (width > MAX_SIDE || height > MAX_SIDE) return `Width and height can be at most ${MAX_SIDE} pixels.`;
  if (width * height > MAX_PIXELS) return "That output is too large for a browser to create. Choose a smaller size.";
  return null;
}

/** photo.final.png + webp → photo.final-resized.webp */
export function outputFileName(originalName, formatId) {
  const format = FORMATS.find((f) => f.id === formatId) ?? FORMATS[0];
  const base = originalName.replace(/\.[^./\\]+$/, "").replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  return `${base}-resized.${format.extension}`;
}

/** Check the chosen file. Returns an error string or null. */
export function validateFile(file) {
  if (!file) return "Choose an image first.";
  if (!file.type.startsWith("image/")) return "That file is not an image. Choose a JPG, PNG, WebP or similar picture.";
  if (file.size > MAX_FILE_BYTES) return "That image is larger than 25 MB. Choose a smaller file.";
  return null;
}
