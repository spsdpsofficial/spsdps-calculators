import ToolPage from "@/components/calculator/ToolPage";
import BmiCalculatorTool, { content } from "@/features/health/bmi-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "bmi-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="bmi-calculator" content={content}>
      <BmiCalculatorTool />
    </ToolPage>
  );
}
