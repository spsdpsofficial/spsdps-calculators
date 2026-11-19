import ToolPage from "@/components/calculator/ToolPage";
import RdCalculatorTool, { content } from "@/features/finance/rd-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "rd-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="rd-calculator" content={content}>
      <RdCalculatorTool />
    </ToolPage>
  );
}
