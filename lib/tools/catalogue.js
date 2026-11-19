// The 81-tool catalogue. This file is the single source of truth for routes, navigation,
// sitemap and internal links.
//
// Publishing a tool = building it, then changing its `status` to "live" and setting
// `lastReviewed` (ISO date of the last genuine accuracy review). A "planned" tool is
// never linked as a page, never listed in the sitemap, and its route (if any) is noindex.

// A tool that is built, tested and reviewed. `lastReviewed` must be the date it was genuinely checked.
const live = (category, slug, name, description, keyword, lastReviewed) => ({
  category,
  slug,
  name,
  description,
  keyword,
  status: "live",
  lastReviewed,
});

/** Kept for adding future tools: a listed-but-unpublished tool stays out of the sitemap and is noindexed. */
export const planned = (category, slug, name, description, keyword) => ({
  category,
  slug,
  name,
  description,
  keyword, // primary search phrase this page targets
  status: "planned",
  lastReviewed: null,
});

export const TOOLS = [
  // ---- Finance & Investment ------------------------------------------------
  {
    category: "finance",
    slug: "emi-calculator",
    name: "EMI Calculator",
    description: "Monthly loan EMI, total interest and total repayment.",
    keyword: "emi calculator",
    status: "live",
    lastReviewed: "2026-11-11",
  },
  live("finance", "sip-calculator", "SIP Calculator", "Estimated future value of recurring investments.", "sip calculator", "2026-11-11"),
  live("finance", "gst-calculator", "GST Calculator", "Add or remove GST and see taxable value and tax.", "gst calculator", "2026-11-11"),
  live("finance", "fd-calculator", "FD Calculator", "Fixed-deposit maturity amount and interest.", "fd calculator", "2026-11-11"),
  live("finance", "rd-calculator", "RD Calculator", "Recurring-deposit maturity estimate.", "rd calculator", "2026-11-11"),
  live("finance", "ppf-calculator", "PPF Calculator", "PPF maturity projection from yearly deposits.", "ppf calculator", "2026-11-11"),
  live("finance", "compound-interest", "Compound Interest Calculator", "Growth of principal with compounding frequency.", "compound interest calculator", "2026-11-11"),
  live("finance", "simple-interest", "Simple Interest Calculator", "Simple interest and maturity amount.", "simple interest calculator", "2026-11-11"),
  live("finance", "loan-prepayment", "Loan Prepayment Calculator", "Interest saved and time cut by prepaying a loan.", "loan prepayment calculator", "2026-11-11"),
  live("finance", "credit-card-interest", "Credit Card Interest Calculator", "Estimate interest on a credit card balance.", "credit card interest calculator", "2026-11-11"),
  live("finance", "home-loan", "Home Loan Calculator", "Home loan EMI, interest and total cost of a home.", "home loan calculator", "2026-11-13"),
  live("finance", "personal-loan", "Personal Loan Calculator", "Personal loan EMI and effective rate after fees.", "personal loan calculator", "2026-11-13"),
  live("finance", "home-loan-eligibility", "Home Loan Eligibility Calculator", "Estimate how much home loan you may get.", "home loan eligibility calculator", "2026-11-13"),
  live("finance", "lumpsum-calculator", "Lumpsum Calculator", "Growth of a one-time investment.", "lumpsum calculator", "2026-11-13"),
  live("finance", "cagr-calculator", "CAGR Calculator", "Compound annual growth rate between two values.", "cagr calculator", "2026-11-13"),
  live("finance", "swp-calculator", "SWP Calculator", "Monthly withdrawals from an investment corpus.", "swp calculator", "2026-11-13"),
  live("finance", "nps-calculator", "NPS Calculator", "NPS corpus, lump sum and pension estimate.", "nps calculator", "2026-11-13"),
  live("finance", "inflation-calculator", "Inflation Calculator", "Future cost and purchasing power of money.", "inflation calculator", "2026-11-13"),
  live("finance", "present-future-value", "Present & Future Value Calculator", "Time value of money for a single amount.", "present value calculator", "2026-11-13"),
  live("finance", "roi-calculator", "ROI Calculator", "Return on investment and annualised return.", "roi calculator", "2026-11-13"),
  live("finance", "stamp-duty-calculator", "Stamp Duty Calculator", "Stamp duty and registration charges on property.", "stamp duty calculator", "2026-11-13"),
  live("finance", "sukanya-samriddhi", "Sukanya Samriddhi Calculator", "SSY maturity value from yearly deposits.", "sukanya samriddhi calculator", "2026-11-13"),
  live("finance", "nsc-calculator", "NSC Calculator", "National Savings Certificate maturity value.", "nsc calculator", "2026-11-13"),
  live("finance", "scss-calculator", "SCSS Calculator", "Senior Citizen Savings Scheme quarterly interest.", "scss calculator", "2026-11-13"),
  live("finance", "gold-calculator", "Gold Price Calculator", "Gold or silver jewellery price with GST.", "gold calculator", "2026-11-13"),

  // ---- Salary, Tax & Employment -------------------------------------------
  live("salary-tax", "salary-calculator", "Salary Calculator", "Estimate in-hand salary from salary components.", "salary calculator", "2026-11-11"),
  live("salary-tax", "income-tax", "Income Tax Calculator", "Estimate income tax by regime and financial year.", "income tax calculator", "2026-11-11"),
  live("salary-tax", "hra-calculator", "HRA Calculator", "Estimate HRA exemption from salary, rent and city.", "hra calculator", "2026-11-11"),
  live("salary-tax", "gratuity-calculator", "Gratuity Calculator", "Estimate gratuity from last salary and service.", "gratuity calculator", "2026-11-11"),
  live("salary-tax", "ctc-to-in-hand", "CTC to In-Hand Calculator", "Break CTC into a monthly take-home estimate.", "ctc to in hand salary calculator", "2026-11-11"),
  live("salary-tax", "salary-hike", "Salary Hike Calculator", "Revised salary and percentage increase.", "salary hike calculator", "2026-11-11"),
  live("salary-tax", "epf-calculator", "EPF Calculator", "Estimate EPF contributions and balance.", "epf calculator", "2026-11-11"),
  live("salary-tax", "professional-tax", "Professional Tax Calculator", "Estimate state-specific professional tax.", "professional tax calculator", "2026-11-11"),
  live("salary-tax", "capital-gains", "Capital Gains Tax Calculator", "STCG and LTCG tax on shares, funds and property.", "capital gains tax calculator", "2026-11-13"),
  live("salary-tax", "tds", "TDS Calculator", "Tax deducted at source by type of payment.", "tds calculator", "2026-11-13"),
  live("salary-tax", "advance-tax", "Advance Tax Calculator", "Advance tax instalments and due dates.", "advance tax calculator", "2026-11-13"),
  live("salary-tax", "overtime", "Overtime Pay Calculator", "Overtime pay from wage and extra hours.", "overtime calculator", "2026-11-13"),
  live("salary-tax", "leave-encashment", "Leave Encashment Calculator", "Leave encashment amount and tax exemption.", "leave encashment calculator", "2026-11-13"),

  // ---- Daily Life ----------------------------------------------------------
  live("daily-life", "age-calculator", "Age Calculator", "Age in years, months and days on a chosen date.", "age calculator", "2026-11-11"),
  live("daily-life", "date-difference", "Date Difference Calculator", "Days, weeks and months between two dates.", "date difference calculator", "2026-11-11"),
  live("daily-life", "percentage-calculator", "Percentage Calculator", "Percentage, increase and decrease.", "percentage calculator", "2026-11-11"),
  live("daily-life", "discount-calculator", "Discount Calculator", "Sale price, discount and savings.", "discount calculator", "2026-11-11"),
  live("daily-life", "electricity-bill", "Electricity Bill Calculator", "Estimate a bill from units and tariff slabs you enter.", "electricity bill calculator", "2026-11-11"),
  live("daily-life", "fuel-cost", "Fuel Cost Calculator", "Trip cost from distance, mileage and fuel price.", "fuel cost calculator", "2026-11-11"),
  live("daily-life", "travel-budget", "Travel Budget Calculator", "Estimate trip expenses by days and people.", "travel budget calculator", "2026-11-11"),
  live("daily-life", "time-duration", "Time Duration Calculator", "Time between clock times, including overnight.", "time duration calculator", "2026-11-11"),
  live("daily-life", "unit-converter", "Unit Converter", "Length, weight, temperature, volume and more.", "unit converter", "2026-11-11"),
  live("daily-life", "retirement-calculator", "Retirement Calculator", "Estimate savings needed or future corpus.", "retirement calculator", "2026-11-11"),
  live("daily-life", "day-of-week", "Day of the Week Calculator", "Weekday, day of year and ISO week for any date.", "day of the week calculator", "2026-11-13"),
  live("daily-life", "tip-split", "Tip & Bill Split Calculator", "Add a tip and split a bill between people.", "tip calculator", "2026-11-13"),
  live("daily-life", "gpa-cgpa", "CGPA to Percentage Calculator", "Convert CGPA and percentage, or average SGPAs.", "cgpa to percentage calculator", "2026-11-13"),
  live("daily-life", "time-zone", "Time Zone Converter", "Convert times between India and world cities.", "time zone converter", "2026-11-13"),

  // ---- Health & Fitness ----------------------------------------------------
  live("health", "bmi-calculator", "BMI Calculator", "BMI estimate with adult and child limitations.", "bmi calculator", "2026-11-12"),
  live("health", "calorie-calculator", "Calorie Calculator", "Daily energy estimate using a stated formula.", "calorie calculator", "2026-11-12"),
  live("health", "ideal-weight", "Ideal Weight Calculator", "Formula-based weight range with limitations.", "ideal weight calculator", "2026-11-12"),
  live("health", "water-intake", "Water Intake Calculator", "General hydration estimate, not medical advice.", "water intake calculator", "2026-11-12"),
  live("health", "body-fat", "Body Fat Calculator", "Estimate body fat using a selected method.", "body fat calculator", "2026-11-12"),
  live("health", "macronutrient", "Macronutrient Calculator", "Macro split from calorie target and goal.", "macro calculator", "2026-11-12"),
  live("health", "due-date", "Pregnancy Due Date Calculator", "Estimated due date and pregnancy week.", "due date calculator", "2026-11-13"),
  live("health", "ovulation", "Ovulation Calculator", "Ovulation day, fertile window and next period.", "ovulation calculator", "2026-11-13"),
  live("health", "protein-intake", "Protein Intake Calculator", "Daily protein range by weight and activity.", "protein intake calculator", "2026-11-13"),
  live("health", "target-heart-rate", "Target Heart Rate Calculator", "Heart-rate zones by age and resting rate.", "target heart rate calculator", "2026-11-13"),
  live("health", "pace-calculator", "Running Pace Calculator", "Pace, speed and projected race times.", "pace calculator", "2026-11-13"),

  // ---- Business & Shopping -------------------------------------------------
  live("business", "profit-margin", "Profit Margin Calculator", "Profit, margin and markup.", "profit margin calculator", "2026-11-12"),
  live("business", "markup-calculator", "Markup Calculator", "Selling price from cost and markup.", "markup calculator", "2026-11-12"),
  live("business", "break-even", "Break-even Calculator", "Units or revenue needed to cover costs.", "break even calculator", "2026-11-12"),
  live("business", "business-loan", "Business Loan Calculator", "Business loan EMI and repayment estimate.", "business loan emi calculator", "2026-11-12"),
  live("business", "price-comparison", "Price Comparison Calculator", "Compare unit prices, pack sizes and discounts.", "price comparison calculator", "2026-11-12"),
  live("business", "reverse-gst", "Reverse GST Calculator", "Extract taxable value and GST from an inclusive price.", "reverse gst calculator", "2026-11-12"),

  // ---- Extra Utilities -----------------------------------------------------
  live("utilities", "qr-code-generator", "QR Code Generator", "Generate a QR code from text or a URL.", "qr code generator", "2026-11-13"),
  live("utilities", "word-counter", "Word Counter", "Count words, characters, sentences and reading time.", "word counter", "2026-11-13"),
  live("utilities", "case-converter", "Case Converter", "Upper, lower, title and sentence case.", "case converter", "2026-11-13"),
  live("utilities", "password-generator", "Password Generator", "Generate strong passwords locally in your browser.", "password generator", "2026-11-13"),
  live("utilities", "json-formatter", "JSON Formatter", "Format, validate and minify JSON locally.", "json formatter", "2026-11-13"),
  live("utilities", "url-encoder-decoder", "URL Encoder & Decoder", "Encode and decode URL components.", "url encoder decoder", "2026-11-13"),
  live("utilities", "pdf-merger", "PDF Merger", "Merge PDF files locally where feasible.", "merge pdf", "2026-11-13"),
  live("utilities", "pdf-compressor", "PDF Compressor", "Compress PDFs within browser limits.", "compress pdf", "2026-11-13"),
  live("utilities", "image-resizer", "Image Resizer", "Resize and export images in your browser.", "image resizer", "2026-11-13"),
  live("utilities", "random-number-generator", "Random Number Generator", "Random values in a range you choose.", "random number generator", "2026-11-13"),
  live("utilities", "base64", "Base64 Encoder & Decoder", "Encode and decode Base64 text in your browser.", "base64 encoder decoder", "2026-11-13"),
  live("utilities", "dice-roller", "Dice Roller & Coin Flip", "Roll dice or flip a coin with secure randomness.", "dice roller", "2026-11-13"),
];
