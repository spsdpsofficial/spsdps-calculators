import ToolPage from "@/components/calculator/ToolPage";
import ScssCalculatorTool, { content } from "@/features/finance/scss-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "scss-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="scss-calculator" content={content}>
      <ScssCalculatorTool />
    </ToolPage>
  );
}
