// Maintainer check for the QR encoder: writes QR matrices as JSON for scripts/verify-qr.py (OpenCV decode).
// Run:  node scripts/verify-qr-dump.mjs > /tmp/qr-cases.json && python3 scripts/verify-qr.py /tmp/qr-cases.json
import { encodeQr, byteCapacity, LEVELS, MAX_VERSION } from "../features/utilities/qr-code-generator/calculations/calculate.js";
const cases = [];
for (const { id } of LEVELS) for (let v = 1; v <= MAX_VERSION; v++) {
  const cap = byteCapacity(v, id);
  for (const len of [Math.max(1, cap - 5 > 0 ? cap : 1), cap, Math.max(1, Math.floor(cap / 2))]) {
    // pseudo-random printable text so every data pattern differs
    let s = ""; let seed = v * 131 + len * 7 + id.charCodeAt(0);
    while (s.length < len) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; s += String.fromCharCode(33 + (seed % 90)); }
    const r = encodeQr(s, id);
    cases.push({ text: s, level: id, version: r.version, modules: r.modules });
  }
}
for (const t of ["https://www.example.com", "upi://pay?pa=shop@bank&pn=Asha%20Store&am=150", "₹500 नमस्ते 😀", "WIFI:T:WPA;S:Home;P:pass1234;;"]) {
  const r = encodeQr(t, "M"); cases.push({ text: t, level: "M", version: r.version, modules: r.modules });
}
process.stdout.write(JSON.stringify(cases));
