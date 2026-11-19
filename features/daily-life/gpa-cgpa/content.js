export const content = {
  seo: {
    title: "CGPA to Percentage Calculator (and Back)",
    description:
      "Convert CGPA to percentage and percentage to CGPA with the 9.5 factor or your own, and find your CGPA from semester SGPAs. Includes the formula and an example.",
    keywords: ["cgpa to percentage calculator", "cgpa calculator", "percentage to cgpa", "sgpa to cgpa calculator", "cgpa to percentage 9.5"],
  },
  h1: "CGPA to Percentage Calculator",
  intro: [
    "Many Indian colleges and universities grade students with a CGPA on a 10-point scale, while jobs, exams and admissions often ask for a percentage. This calculator converts both ways. The widely used rule, followed by CBSE, is percentage = CGPA × 9.5.",
    "You can also enter your semester SGPAs to find a CGPA. Some universities use a different factor or a formula of their own, so check your university's official rule for forms that need an exact figure.",
  ],
  howTo: ["Choose whether you want the percentage, the CGPA, or a CGPA from SGPAs.", "Enter your CGPA, percentage or SGPAs.", "Change the factor if your university uses a different one.", "Read the result."],
  formula: {
    expression: "Percentage = CGPA × 9.5\nCGPA = Percentage ÷ 9.5\nCGPA from SGPAs = Sum of SGPAs ÷ Number of semesters",
    variables: [
      { symbol: "9.5", meaning: "the conversion factor commonly used. Some universities use another factor or a formula." },
      { symbol: "SGPA", meaning: "the grade point average for a single semester." },
    ],
    notes: ["The average of SGPAs assumes every semester has the same credits."],
  },
  example: {
    scenario: "A student has a CGPA of 8.4 and needs the percentage.",
    inputs: [{ label: "CGPA and factor", value: "8.4 with 9.5" }],
    results: [{ label: "Percentage", value: "79.8%" }],
    steps: ["Percentage = CGPA × 9.5.", "8.4 × 9.5 = 79.8%."],
    expected: { cgpa: 8.4, factor: 9.5, percent: 79.8 },
  },
  factors: [
    { title: "University rules", text: "Universities may use their own conversion formula." },
    { title: "Credits", text: "A credit-weighted CGPA can differ from a simple average of SGPAs." },
    { title: "Scale", text: "This tool assumes a 10-point scale." },
  ],
  benefits: ["Get the percentage for job and exam forms.", "Convert both ways.", "Work out your CGPA from semester results."],
  assumptions: ["A 10-point CGPA scale.", "The factor is the one you enter, 9.5 by default.", "SGPAs carry equal credits."],
  faqs: [
    { q: "How do I convert CGPA to percentage?", a: "Multiply your CGPA by 9.5, which is the common conversion factor." },
    { q: "Does every university use 9.5?", a: "No. Many do, but some use another factor or a formula. Use your own university's official rule when you can." },
    { q: "How do I convert percentage to CGPA?", a: "Divide the percentage by 9.5, or by your university's factor." },
    { q: "How is CGPA calculated from SGPA?", a: "By a credit-weighted average of semester results. If every semester has equal credits it is a simple average." },
    { q: "Is CGPA the same as GPA?", a: "They are very similar. CGPA is cumulative over all semesters, and GPA is often for a term or year." },
  ],
  related: ["daily-life/percentage-calculator", "daily-life/age-calculator", "daily-life/time-duration", "daily-life/unit-converter"],
  references: [
    { label: "Central Board of Secondary Education", url: "https://www.cbse.gov.in/" },
    { label: "University Grants Commission", url: "https://www.ugc.gov.in/" },
  ],
};
