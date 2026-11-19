import ToolPage from "@/components/calculator/ToolPage";
import SwpCalculatorTool, { content } from "@/features/finance/swp-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "swp-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="swp-calculator" content={content}>
      <SwpCalculatorTool />
    </ToolPage>
  );
}
