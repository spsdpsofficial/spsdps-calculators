import ToolPage from "@/components/calculator/ToolPage";
import HraCalculatorTool, { content } from "@/features/salary-tax/hra-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "hra-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="hra-calculator" content={content}>
      <HraCalculatorTool />
    </ToolPage>
  );
}
