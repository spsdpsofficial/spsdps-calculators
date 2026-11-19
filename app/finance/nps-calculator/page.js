import ToolPage from "@/components/calculator/ToolPage";
import NpsCalculatorTool, { content } from "@/features/finance/nps-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "nps-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="nps-calculator" content={content}>
      <NpsCalculatorTool />
    </ToolPage>
  );
}
