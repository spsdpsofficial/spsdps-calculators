import ToolPage from "@/components/calculator/ToolPage";
import PpfCalculatorTool, { content } from "@/features/finance/ppf-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "ppf-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="ppf-calculator" content={content}>
      <PpfCalculatorTool />
    </ToolPage>
  );
}
