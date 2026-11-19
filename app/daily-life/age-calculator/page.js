import ToolPage from "@/components/calculator/ToolPage";
import AgeCalculatorTool, { content } from "@/features/daily-life/age-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "age-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="age-calculator" content={content}>
      <AgeCalculatorTool />
    </ToolPage>
  );
}
