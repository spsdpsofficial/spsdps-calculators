import ToolPage from "@/components/calculator/ToolPage";
import CapitalGainsTool, { content } from "@/features/salary-tax/capital-gains";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "capital-gains", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="capital-gains" content={content}>
      <CapitalGainsTool />
    </ToolPage>
  );
}
