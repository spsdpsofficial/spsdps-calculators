// Self-contained QR Code (Model 2) encoder: byte mode, versions 1–10, error-correction levels L/M/Q/H.
// No third-party code. Verified by decoding generated codes with an independent reader (OpenCV) for every
// version and level; see tests/ and docs. Structure follows ISO/IEC 18004.

export const MAX_VERSION = 10;
export const LEVELS = [
  { id: "L", label: "Low (7% recovery)", formatBits: 1 },
  { id: "M", label: "Medium (15% recovery)", formatBits: 0 },
  { id: "Q", label: "Quartile (25% recovery)", formatBits: 3 },
  { id: "H", label: "High (30% recovery)", formatBits: 2 },
];

// Error-correction codewords per block, and [blocks, dataCodewordsPerBlock] groups, for versions 1..10.
// Index 0 is unused so the version number can be used directly.
const EC_TABLE = {
  L: [null, [7, [1, 19]], [10, [1, 34]], [15, [1, 55]], [20, [1, 80]], [26, [1, 108]], [18, [2, 68]], [20, [2, 78]], [24, [2, 97]], [30, [2, 116]], [18, [2, 68], [2, 69]]],
  M: [null, [10, [1, 16]], [16, [1, 28]], [26, [1, 44]], [18, [2, 32]], [24, [2, 43]], [16, [4, 27]], [18, [4, 31]], [22, [2, 38], [2, 39]], [22, [3, 36], [2, 37]], [26, [4, 43], [1, 44]]],
  Q: [null, [13, [1, 13]], [22, [1, 22]], [18, [2, 17]], [26, [2, 24]], [18, [2, 15], [2, 16]], [24, [4, 19]], [18, [2, 14], [4, 15]], [22, [4, 18], [2, 19]], [20, [4, 16], [4, 17]], [24, [6, 19], [2, 20]]],
  H: [null, [17, [1, 9]], [28, [1, 16]], [22, [2, 13]], [16, [4, 9]], [22, [2, 11], [2, 12]], [28, [4, 15]], [26, [4, 13], [1, 14]], [26, [4, 14], [2, 15]], [24, [4, 12], [4, 13]], [28, [6, 15], [2, 16]]],
};
const ALIGNMENT = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]];

/** Data codeword layout for a version and level: { eccPerBlock, blocks: [dataLength, ...] }. */
function layout(version, level) {
  const [eccPerBlock, ...groups] = EC_TABLE[level][version];
  const blocks = groups.flatMap(([count, dataLength]) => Array(count).fill(dataLength));
  return { eccPerBlock, blocks, dataCodewords: blocks.reduce((a, b) => a + b, 0) };
}

/** Largest number of bytes that fit at a version and level (byte mode). */
export function byteCapacity(version, level) {
  const countBits = version <= 9 ? 8 : 16;
  return Math.floor((layout(version, level).dataCodewords * 8 - 4 - countBits) / 8);
}

// ---- Reed–Solomon over GF(256) (polynomial 0x11D) ---------------------------------------------
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
for (let i = 0, x = 1; i < 255; i++) {
  EXP[i] = x;
  LOG[x] = i;
  x <<= 1;
  if (x & 0x100) x ^= 0x11d;
}
for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
const mul = (a, b) => (a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]);

function generatorPolynomial(degree) {
  const result = new Array(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = mul(result[j], root);
      if (j + 1 < degree) result[j] ^= result[j + 1];
    }
    root = mul(root, 2);
  }
  return result;
}

/** Error-correction codewords for one block of data codewords. */
export function reedSolomon(data, degree) {
  const divisor = generatorPolynomial(degree);
  const result = new Array(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ result.shift();
    result.push(0);
    for (let i = 0; i < degree; i++) result[i] ^= mul(divisor[i], factor);
  }
  return result;
}

// ---- Bit stream ---------------------------------------------------------------------------------
function buildDataCodewords(bytes, version, level) {
  const { dataCodewords } = layout(version, level);
  const bits = [];
  const push = (value, length) => { for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1); };
  push(0b0100, 4); // byte mode
  push(bytes.length, version <= 9 ? 8 : 16);
  for (const b of bytes) push(b, 8);
  const capacityBits = dataCodewords * 8;
  push(0, Math.min(4, capacityBits - bits.length)); // terminator
  while (bits.length % 8) bits.push(0);
  const codewords = [];
  for (let i = 0; i < bits.length; i += 8) codewords.push(parseInt(bits.slice(i, i + 8).join(""), 2));
  for (let pad = 0xec; codewords.length < dataCodewords; pad ^= 0xec ^ 0x11) codewords.push(pad);
  return codewords;
}

/** Split into blocks, add error correction and interleave, as the standard requires. */
function interleave(data, version, level) {
  const { eccPerBlock, blocks } = layout(version, level);
  const dataBlocks = [];
  let offset = 0;
  for (const length of blocks) {
    dataBlocks.push(data.slice(offset, offset + length));
    offset += length;
  }
  const eccBlocks = dataBlocks.map((block) => reedSolomon(block, eccPerBlock));
  const out = [];
  const longest = Math.max(...blocks);
  for (let i = 0; i < longest; i++) for (const block of dataBlocks) if (i < block.length) out.push(block[i]);
  for (let i = 0; i < eccPerBlock; i++) for (const block of eccBlocks) out.push(block[i]);
  return out;
}

// ---- Matrix -------------------------------------------------------------------------------------
class Matrix {
  constructor(version) {
    this.version = version;
    this.size = 17 + 4 * version;
    this.modules = Array.from({ length: this.size }, () => new Array(this.size).fill(false));
    this.isFunction = Array.from({ length: this.size }, () => new Array(this.size).fill(false));
  }

  setFunction(x, y, dark) {
    this.modules[y][x] = dark;
    this.isFunction[y][x] = true;
  }

  drawFunctionPatterns() {
    const { size, version } = this;
    for (let i = 0; i < size; i++) {
      this.setFunction(6, i, i % 2 === 0);
      this.setFunction(i, 6, i % 2 === 0);
    }
    for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (x < 0 || y < 0 || x >= size || y >= size) continue;
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          this.setFunction(x, y, dist !== 2 && dist !== 4);
        }
      }
    }
    const positions = ALIGNMENT[version];
    const last = positions.length - 1;
    positions.forEach((cy, i) => positions.forEach((cx, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) this.setFunction(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
    this.drawFormat(0, 0); // reserve the format areas; real bits are written after masking
    if (version >= 7) {
      let rem = version;
      for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
      const bits = (version << 12) | rem;
      for (let i = 0; i < 18; i++) {
        const dark = ((bits >>> i) & 1) === 1;
        const a = size - 11 + (i % 3);
        const b = Math.floor(i / 3);
        this.setFunction(a, b, dark);
        this.setFunction(b, a, dark);
      }
    }
  }

  drawFormat(formatBits, mask) {
    const { size } = this;
    const data = (formatBits << 3) | mask;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const bits = ((data << 10) | rem) ^ 0x5412;
    const bit = (i) => ((bits >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) this.setFunction(8, i, bit(i));
    this.setFunction(8, 7, bit(6));
    this.setFunction(8, 8, bit(7));
    this.setFunction(7, 8, bit(8));
    for (let i = 9; i < 15; i++) this.setFunction(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) this.setFunction(size - 1 - i, 8, bit(i));
    for (let i = 8; i < 15; i++) this.setFunction(8, size - 15 + i, bit(i));
    this.setFunction(8, size - 8, true); // the always-dark module
  }

  placeCodewords(codewords) {
    const { size } = this;
    let i = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const upward = ((right + 1) & 2) === 0;
          const y = upward ? size - 1 - vert : vert;
          if (!this.isFunction[y][x] && i < codewords.length * 8) {
            this.modules[y][x] = ((codewords[i >>> 3] >>> (7 - (i & 7))) & 1) === 1;
            i++;
          }
        }
      }
    }
  }

  applyMask(mask) {
    const conditions = [
      (x, y) => (x + y) % 2 === 0,
      (x, y) => y % 2 === 0,
      (x) => x % 3 === 0,
      (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
      (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
      (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
      (x, y) => ((((x + y) % 2) + ((x * y) % 3)) % 2) === 0,
    ];
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (!this.isFunction[y][x] && conditions[mask](x, y)) this.modules[y][x] = !this.modules[y][x];
      }
    }
  }

  penalty() {
    const { size, modules } = this;
    let score = 0;
    const lines = [];
    for (let i = 0; i < size; i++) {
      lines.push(modules[i]);
      lines.push(modules.map((row) => row[i]));
    }
    for (const line of lines) {
      let run = 1;
      for (let i = 1; i <= size; i++) {
        if (i < size && line[i] === line[i - 1]) run++;
        else {
          if (run >= 5) score += 3 + (run - 5);
          run = 1;
        }
      }
      const text = line.map((v) => (v ? "1" : "0")).join("");
      for (const pattern of ["00001011101", "10111010000"]) {
        for (let at = text.indexOf(pattern); at !== -1; at = text.indexOf(pattern, at + 1)) score += 40;
      }
    }
    for (let y = 0; y < size - 1; y++) {
      for (let x = 0; x < size - 1; x++) {
        const c = modules[y][x];
        if (c === modules[y][x + 1] && c === modules[y + 1][x] && c === modules[y + 1][x + 1]) score += 3;
      }
    }
    const dark = modules.flat().filter(Boolean).length;
    score += Math.floor(Math.abs((dark * 20) / (size * size) - 10)) * 10;
    return score;
  }
}

/**
 * Encode text as a QR code. Returns { modules, size, version, mask, level } or { error }.
 * `modules[y][x]` is true for a dark module (without the quiet zone).
 */
export function encodeQr(text, levelId = "M") {
  const level = LEVELS.find((l) => l.id === levelId);
  if (!level) return { error: "Unknown error-correction level." };
  if (text.length === 0) return { error: "Enter some text or a link first." };
  const bytes = Array.from(new TextEncoder().encode(text));
  let version = 1;
  while (version <= MAX_VERSION && byteCapacity(version, level.id) < bytes.length) version++;
  if (version > MAX_VERSION) {
    return { error: `This is too long for this tool: at most ${byteCapacity(MAX_VERSION, level.id)} bytes fit at the ${level.id} level. Shorten the text or choose a lower error-correction level.` };
  }

  const codewords = interleave(buildDataCodewords(bytes, version, level.id), version, level.id);
  const matrix = new Matrix(version);
  matrix.drawFunctionPatterns();
  matrix.placeCodewords(codewords);

  let best = { mask: 0, score: Infinity };
  for (let mask = 0; mask < 8; mask++) {
    matrix.applyMask(mask);
    matrix.drawFormat(level.formatBits, mask);
    const score = matrix.penalty();
    if (score < best.score) best = { mask, score };
    matrix.applyMask(mask); // undo
  }
  matrix.applyMask(best.mask);
  matrix.drawFormat(level.formatBits, best.mask);
  return { modules: matrix.modules, size: matrix.size, version, mask: best.mask, level: level.id };
}

/** SVG path data for the dark modules, offset by the quiet-zone `border` (modules). */
export function qrPath(modules, border = 4) {
  const parts = [];
  modules.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (!row[x]) continue;
      let end = x;
      while (end + 1 < row.length && row[end + 1]) end++; // merge horizontal runs
      parts.push(`M${x + border},${y + border}h${end - x + 1}v1h${-(end - x + 1)}z`);
      x = end;
    }
  });
  return parts.join("");
}

/** Standalone SVG file text (numbers only, so it is safe to embed or download). */
export function qrSvg(modules, border = 4) {
  const total = modules.length + border * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${total * 8}" height="${total * 8}" shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="#fff"/><path d="${qrPath(modules, border)}" fill="#000"/></svg>`;
}
