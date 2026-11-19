import ToolPage from "@/components/calculator/ToolPage";
import CagrCalculatorTool, { content } from "@/features/finance/cagr-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "cagr-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="cagr-calculator" content={content}>
      <CagrCalculatorTool />
    </ToolPage>
  );
}
