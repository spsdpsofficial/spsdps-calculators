import ToolPage from "@/components/calculator/ToolPage";
import IncomeTaxTool, { content } from "@/features/salary-tax/income-tax";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "income-tax", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="income-tax" content={content}>
      <IncomeTaxTool />
    </ToolPage>
  );
}
