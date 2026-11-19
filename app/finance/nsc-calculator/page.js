import ToolPage from "@/components/calculator/ToolPage";
import NscCalculatorTool, { content } from "@/features/finance/nsc-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "nsc-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="nsc-calculator" content={content}>
      <NscCalculatorTool />
    </ToolPage>
  );
}
