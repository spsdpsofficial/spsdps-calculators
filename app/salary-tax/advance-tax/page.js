import ToolPage from "@/components/calculator/ToolPage";
import AdvanceTaxTool, { content } from "@/features/salary-tax/advance-tax";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "advance-tax", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="advance-tax" content={content}>
      <AdvanceTaxTool />
    </ToolPage>
  );
}
