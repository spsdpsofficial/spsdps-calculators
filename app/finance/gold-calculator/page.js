import ToolPage from "@/components/calculator/ToolPage";
import GoldCalculatorTool, { content } from "@/features/finance/gold-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "gold-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="gold-calculator" content={content}>
      <GoldCalculatorTool />
    </ToolPage>
  );
}
