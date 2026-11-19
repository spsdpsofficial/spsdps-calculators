import ToolPage from "@/components/calculator/ToolPage";
import SalaryCalculatorTool, { content } from "@/features/salary-tax/salary-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "salary-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="salary-calculator" content={content}>
      <SalaryCalculatorTool />
    </ToolPage>
  );
}
