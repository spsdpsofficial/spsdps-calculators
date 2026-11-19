import ToolPage from "@/components/calculator/ToolPage";
import LumpsumCalculatorTool, { content } from "@/features/finance/lumpsum-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "lumpsum-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="lumpsum-calculator" content={content}>
      <LumpsumCalculatorTool />
    </ToolPage>
  );
}
