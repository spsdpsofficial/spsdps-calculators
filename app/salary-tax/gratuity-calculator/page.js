import ToolPage from "@/components/calculator/ToolPage";
import GratuityCalculatorTool, { content } from "@/features/salary-tax/gratuity-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "gratuity-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="gratuity-calculator" content={content}>
      <GratuityCalculatorTool />
    </ToolPage>
  );
}
