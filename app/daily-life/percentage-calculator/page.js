import ToolPage from "@/components/calculator/ToolPage";
import PercentageCalculatorTool, { content } from "@/features/daily-life/percentage-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "percentage-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="percentage-calculator" content={content}>
      <PercentageCalculatorTool />
    </ToolPage>
  );
}
