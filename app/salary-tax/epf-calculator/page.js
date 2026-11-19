import ToolPage from "@/components/calculator/ToolPage";
import EpfCalculatorTool, { content } from "@/features/salary-tax/epf-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "epf-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="epf-calculator" content={content}>
      <EpfCalculatorTool />
    </ToolPage>
  );
}
