import ToolPage from "@/components/calculator/ToolPage";
import GstCalculatorTool, { content } from "@/features/finance/gst-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "gst-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="gst-calculator" content={content}>
      <GstCalculatorTool />
    </ToolPage>
  );
}
