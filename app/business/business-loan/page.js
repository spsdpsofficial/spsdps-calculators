import ToolPage from "@/components/calculator/ToolPage";
import BusinessLoanTool, { content } from "@/features/business/business-loan";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("business", "business-loan", content);

export default function Page() {
  return (
    <ToolPage categorySlug="business" toolSlug="business-loan" content={content}>
      <BusinessLoanTool />
    </ToolPage>
  );
}
