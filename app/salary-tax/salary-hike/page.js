import ToolPage from "@/components/calculator/ToolPage";
import SalaryHikeTool, { content } from "@/features/salary-tax/salary-hike";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "salary-hike", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="salary-hike" content={content}>
      <SalaryHikeTool />
    </ToolPage>
  );
}
