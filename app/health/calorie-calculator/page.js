import ToolPage from "@/components/calculator/ToolPage";
import CalorieCalculatorTool, { content } from "@/features/health/calorie-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "calorie-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="calorie-calculator" content={content}>
      <CalorieCalculatorTool />
    </ToolPage>
  );
}
