import { siteConfig } from "@/lib/constants/site";

// Text for the trust pages. It describes how the site actually behaves today.
// Update it whenever behaviour changes (e.g. when Analytics or ads are switched on) and
// have it reviewed by a qualified professional before public launch.

const updated = siteConfig.legalReviewed;
const name = siteConfig.name;

export const LEGAL = {
  about: {
    title: "About",
    description: `What ${name} is, how its calculators work and how we keep them accurate.`,
    path: "/about/",
    updated,
    sections: [
      {
        heading: "What this site is",
        paragraphs: [
          `${name} is a collection of free calculators and browser-based utilities built for people in India: loan EMIs, investments, salary and tax, everyday maths, health estimates and small business pricing.`,
          `It is made by ${siteConfig.maker} under the SPSDPS name, with one goal: calculators that are easy to use and show their working.`,
          "Every calculator explains its formula, shows a worked example in rupees and lists its assumptions, so you can understand the number and not just copy it.",
        ],
      },
      {
        heading: "How the calculators work",
        paragraphs: [
          "Calculations run inside your browser. The amounts you type are not sent to our servers, because the site has no server-side processing and no database.",
        ],
      },
      {
        heading: "How we keep information accurate",
        paragraphs: [
          "Pages that depend on rules that change, such as income tax slabs or deposit schemes, name the financial year they apply to, link to the official source and show the date they were last reviewed.",
          "If you spot an error, please tell us through the Contact page so we can check and correct it.",
        ],
      },
      {
        heading: "What this site is not",
        paragraphs: [
          "We are not a bank, lender, broker, tax advisor or medical provider. Results are estimates for planning and learning. See the Disclaimer for details.",
        ],
      },
    ],
  },

  contact: {
    title: "Contact",
    description: `Contact ${name}: send corrections, feedback, tool suggestions or questions by email to ${siteConfig.contactEmail}.`,
    path: "/contact/",
    updated,
    sections: [
      {
        heading: "Corrections and feedback",
        paragraphs: [
          "Found a wrong figure, an outdated rule or something confusing? Tell us which page and which numbers you used, and we will review it.",
          "Please do not send passwords, bank details, Aadhaar, PAN or other sensitive personal information.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    description: `How ${name} handles information when you use its calculators and tools.`,
    path: "/privacy-policy/",
    updated,
    sections: [
      {
        heading: "Short version",
        paragraphs: [
          "The numbers and text you enter into our calculators and tools are processed in your browser. We do not receive, store or sell them.",
        ],
      },
      {
        heading: "Information we do not collect",
        paragraphs: [
          "This site has no user accounts and no database. We do not ask for your name, phone number, email address, PAN, Aadhaar or bank details to use any tool.",
        ],
      },
      {
        heading: "Messages you send us",
        paragraphs: [
          `The Contact page form does not send anything through this website. It prepares an email in your own email app (or Gmail) addressed to ${siteConfig.contactEmail}, and nothing is sent until you press send there. If you email us, we receive your email address and whatever you write, and we use it only to reply and to improve the site.`,
        ],
      },
      {
        heading: "Data stored on your device",
        paragraphs: [
          "The theme is not saved. The site always opens in the light theme, and choosing dark lasts only until you refresh or leave the page.",
          "To work offline, the site's service worker keeps copies of pages, scripts and images you have opened in your browser's cache. These stay on your device, contain no personal data, and you can clear them from your browser settings at any time.",
        ],
      },
      {
        heading: "Hosting and server logs",
        paragraphs: [
          "Like most websites, our hosting provider may record technical information such as IP address, browser type and requested page in standard server logs for security and reliability.",
        ],
      },
      {
        heading: "Analytics, advertising and affiliate links",
        paragraphs: [
          "We may use Google Analytics to understand which pages are used, and we may show advertising or affiliate links in the future. If we do, those services may use cookies or similar technologies, and this policy and a consent notice will be updated before they are switched on. Calculator inputs are never sent to analytics or advertising services.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can block or delete cookies, cached files and local storage in your browser at any time. The calculators continue to work without them.",
          "Questions about this policy can be sent through the Contact page.",
        ],
      },
    ],
  },

  terms: {
    title: "Terms of Use",
    description: `The terms for using ${name} calculators, tools and content.`,
    path: "/terms/",
    updated,
    sections: [
      {
        heading: "Using the site",
        paragraphs: [
          `By using ${name} you agree to these terms. If you do not agree, please do not use the site.`,
          "You may use the calculators for personal and business planning. You may not misuse the site, attempt to disrupt it, or scrape it in a way that harms its performance.",
        ],
      },
      {
        heading: "Estimates only",
        paragraphs: [
          "Results are estimates based on the inputs and assumptions shown on each page. Actual figures from banks, employers, tax authorities and other institutions can differ.",
        ],
      },
      {
        heading: "No warranty and limitation of liability",
        paragraphs: [
          "The site is provided as is, without warranties of any kind. To the extent permitted by law, we are not liable for losses arising from decisions made using the calculators or content.",
        ],
      },
      {
        heading: "Content and links",
        paragraphs: [
          "The text, layout and code of this site are protected by copyright. Links to external websites are provided for reference; we do not control and are not responsible for their content.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: ["We may update these terms and the site from time to time. The date at the top shows the latest update."],
      },
    ],
  },

  disclaimer: {
    title: "Disclaimer",
    description: `Important limits on the financial, tax, legal and health information provided by ${name}. Results are estimates, not advice.`,
    path: "/disclaimer/",
    updated,
    sections: [
      {
        heading: "Not professional advice",
        paragraphs: [
          "Content and calculators on this site are for general information and education. They are not financial, investment, tax, legal, accounting or medical advice, and they are not an offer, solicitation or recommendation from any bank, lender, insurer or other institution.",
          `${name} and its maker, ${siteConfig.maker}, are not a bank, lender, broker, registered investment adviser, chartered accountant or healthcare provider.`,
        ],
      },
      {
        heading: "Results are estimates",
        paragraphs: [
          "Every result is calculated from the inputs you enter and the assumptions stated on that page. Real outcomes depend on rules, rates, fees, rounding methods and your personal situation, so they can differ from what a calculator shows.",
        ],
        bullets: [
          "Loan EMIs, interest and eligibility: your lender's own schedule, fees, insurance and policy decide the final numbers.",
          "Investments and returns: returns are assumptions, not promises. Markets can fall, and past performance does not predict future results.",
          "Always confirm final numbers with your lender, employer, tax professional or the official source before you act.",
        ],
      },
      {
        heading: "Tax and legal information",
        paragraphs: [
          "Tax slabs, rates, thresholds, exemptions and scheme interest rates change, often with each Budget or notification. Pages that depend on them name the financial year and show the date they were last reviewed, but a page may be out of date by the time you read it.",
          "Check the Income Tax Department (incometax.gov.in), India Post, PFRDA, the GST portal or another official source for the current rules, and speak to a qualified tax professional about your own case.",
        ],
      },
      {
        heading: "Health and fitness tools",
        paragraphs: [
          "Health calculators give general educational estimates for healthy adults. They do not diagnose, treat or prevent any condition, and they cannot replace a doctor, dietitian or trainer.",
          "Pregnancy and cycle tools are estimates and must not be used as a method of contraception. If you have symptoms, a medical condition, are pregnant, or take medicines, talk to a qualified healthcare professional. In an emergency, contact your local emergency services.",
        ],
      },
      {
        heading: "Your device and your data",
        paragraphs: [
          "Calculations run in your browser on your device. We cannot see your inputs and are not responsible for the security of your device, browser, network or any files you process with the utilities.",
          "Utilities that handle files or text, such as PDF merging or image resizing, work locally. Keep your own copies of important files.",
        ],
      },
      {
        heading: "External links and other sites",
        paragraphs: [
          "Links to official bodies and other websites are provided for reference. We do not control them and are not responsible for their content, availability or privacy practices.",
        ],
      },
      {
        heading: "No guarantee and limitation of liability",
        paragraphs: [
          "The site and its content are provided as is and as available, without warranties of any kind, and we do not guarantee that it will be accurate, complete, uninterrupted or error free. To the fullest extent permitted by law, we are not liable for any loss or damage arising from the use of, or reliance on, the site, its calculators or its content.",
        ],
      },
      {
        heading: "Advertising and affiliate disclosure",
        paragraphs: [
          "If this site shows advertisements or affiliate links in future, they will be clearly labelled, and we will not recommend a product only because it pays a commission.",
        ],
      },
      {
        heading: "Corrections",
        paragraphs: [
          `Found a mistake? Please tell us through the Contact page or at ${siteConfig.contactEmail} and we will review it.`,
        ],
      },
    ],
  },
};
