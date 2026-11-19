import ToolPage from "@/components/calculator/ToolPage";
import RoiCalculatorTool, { content } from "@/features/finance/roi-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "roi-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="roi-calculator" content={content}>
      <RoiCalculatorTool />
    </ToolPage>
  );
}
