export const content = {
  seo: {
    title: "Password Generator: Strong Random Passwords",
    description:
      "Create strong, random passwords with your choice of length and characters. Made with your browser's secure random generator and never sent or stored anywhere.",
    keywords: ["password generator", "strong password generator", "random password", "secure password generator", "generate password online"],
  },
  h1: "Password Generator",
  intro: [
    "A long, random password is one of the best defences for your accounts. This tool creates one using your browser's cryptographically secure random number generator. The password is made on your device and is never sent over the internet or saved.",
    "Choose the length and the types of characters, and see an estimate of its strength. Use a different password for every account and keep them in a password manager.",
  ],
  howTo: [
    "Set the length. 16 or more characters is a good choice.",
    "Choose which types of characters to include.",
    "Click Generate, then Copy password.",
    "Save it in a password manager and do not reuse it on other sites.",
  ],
  formula: {
    expression: "Strength (bits) = Length × log₂(number of possible characters)",
    variables: [
      { symbol: "Length", meaning: "number of characters in the password." },
      { symbol: "Possible characters", meaning: "26 lower case, 26 upper case, 10 digits and 24 symbols, for those you select." },
      { symbol: "Bits", meaning: "each extra bit doubles the number of guesses an attacker needs." },
    ],
    notes: ["Strength is an estimate that assumes every character is random. Passwords you invent yourself are usually much weaker than this."],
  },
  example: {
    scenario: "A 12-character password using upper case, lower case and digits.",
    inputs: [
      { label: "Length", value: "12" },
      { label: "Characters", value: "A–Z, a–z, 0–9 (62 possible)" },
    ],
    results: [{ label: "Strength", value: "about 71 bits (Strong)" }],
    steps: ["There are 62 possible characters at each position.", "log₂(62) is about 5.95 bits per character.", "12 × 5.95 is about 71 bits."],
    expected: { length: 12, bits: 71 },
  },
  factors: [
    { title: "Length", text: "Every added character multiplies the work for an attacker, so length matters most." },
    { title: "Character variety", text: "More character types help, but a longer password beats a short complex one." },
    { title: "Reuse", text: "A strong password reused on many sites is only as safe as the weakest of those sites." },
    { title: "Storage", text: "Use a reputable password manager rather than writing passwords in notes or messages." },
  ],
  benefits: [
    "Truly random, not human-guessable.",
    "Never leaves your device.",
    "Choose characters that suit each site's rules.",
  ],
  assumptions: [
    "Randomness comes from crypto.getRandomValues, with unbiased selection.",
    "At least one character from each chosen type is included.",
    "Some sites reject certain symbols. Turn symbols off if a site does.",
  ],
  faqs: [
    { q: "Is it safe to generate a password online?", a: "With this tool, yes: the password is created in your browser and never transmitted. Even so, avoid generating passwords on shared or untrusted devices." },
    { q: "How long should my password be?", a: "At least 12 characters, and 16 or more for important accounts such as email and banking." },
    { q: "Why avoid look-alike characters?", a: "Characters such as I, l, 1, O and 0 are easy to confuse if you ever have to type the password by hand." },
    { q: "Do you store my passwords?", a: "No. Nothing is saved or sent, and the password disappears when you close the page." },
    { q: "Should I change passwords regularly?", a: "Change them if there is a breach or suspicion. Using a unique strong password and two-factor authentication matters more than frequent changes." },
    { q: "What is two-factor authentication?", a: "A second check, such as a code on your phone, that protects your account even if the password leaks." },
  ],
  related: ["utilities/random-number-generator", "utilities/qr-code-generator", "utilities/case-converter", "utilities/json-formatter"],
  references: [
    { label: "CERT-In: Indian Computer Emergency Response Team", url: "https://www.cert-in.org.in/" },
    { label: "MDN: Crypto.getRandomValues()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues" },
    { label: "Cyber Dost, Government of India", url: "https://www.cybercrime.gov.in/" },
  ],
};
