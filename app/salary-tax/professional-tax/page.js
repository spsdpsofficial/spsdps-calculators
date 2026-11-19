import ToolPage from "@/components/calculator/ToolPage";
import ProfessionalTaxTool, { content } from "@/features/salary-tax/professional-tax";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "professional-tax", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="professional-tax" content={content}>
      <ProfessionalTaxTool />
    </ToolPage>
  );
}
