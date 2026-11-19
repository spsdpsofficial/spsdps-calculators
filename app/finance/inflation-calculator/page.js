import ToolPage from "@/components/calculator/ToolPage";
import InflationCalculatorTool, { content } from "@/features/finance/inflation-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "inflation-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="inflation-calculator" content={content}>
      <InflationCalculatorTool />
    </ToolPage>
  );
}
