import ToolPage from "@/components/calculator/ToolPage";
import StampDutyCalculatorTool, { content } from "@/features/finance/stamp-duty-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "stamp-duty-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="stamp-duty-calculator" content={content}>
      <StampDutyCalculatorTool />
    </ToolPage>
  );
}
