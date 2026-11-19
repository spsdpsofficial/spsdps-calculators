import ToolPage from "@/components/calculator/ToolPage";
import RetirementCalculatorTool, { content } from "@/features/daily-life/retirement-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "retirement-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="retirement-calculator" content={content}>
      <RetirementCalculatorTool />
    </ToolPage>
  );
}
