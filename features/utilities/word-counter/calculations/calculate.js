/** Reading speeds used for the time estimates (words per minute). Adults read about 200–250 wpm silently. */
export const READING_WPM = 200;
export const SPEAKING_WPM = 130;

const hasContent = (token) => /[\p{L}\p{N}]/u.test(token);

/** Count words, characters, sentences, paragraphs and lines. Works with any Unicode script. */
export function countText(text) {
  const words = text.split(/\s+/).filter(hasContent);
  const sentences = text.split(/[.!?।؟]+/).filter(hasContent);
  const paragraphs = text.split(/\n\s*\n/).filter(hasContent);
  const characters = Array.from(text).length;
  const charactersNoSpaces = Array.from(text.replace(/\s/g, "")).length;
  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    lines: text === "" ? 0 : text.split(/\r\n|\r|\n/).length,
    readingMinutes: words.length / READING_WPM,
    speakingMinutes: words.length / SPEAKING_WPM,
  };
}

/** 0.4 → "24 sec", 3.2 → "3 min 12 sec". */
export function formatMinutes(minutes) {
  const totalSeconds = Math.round(minutes * 60);
  if (totalSeconds < 60) return `${totalSeconds} sec`;
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return s ? `${m} min ${s} sec` : `${m} min`;
}

/** Most frequent words (case-insensitive), ignoring one-letter tokens. */
export function topWords(text, limit = 5) {
  const counts = new Map();
  for (const raw of text.toLowerCase().split(/\s+/)) {
    const word = raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
    if (word.length > 1) counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit);
}
