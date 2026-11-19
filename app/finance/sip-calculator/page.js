import ToolPage from "@/components/calculator/ToolPage";
import SipCalculatorTool, { content } from "@/features/finance/sip-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "sip-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="sip-calculator" content={content}>
      <SipCalculatorTool />
    </ToolPage>
  );
}
