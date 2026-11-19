import ToolPage from "@/components/calculator/ToolPage";
import PaceCalculatorTool, { content } from "@/features/health/pace-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "pace-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="pace-calculator" content={content}>
      <PaceCalculatorTool />
    </ToolPage>
  );
}
