import ToolPage from "@/components/calculator/ToolPage";
import ProfitMarginTool, { content } from "@/features/business/profit-margin";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("business", "profit-margin", content);

export default function Page() {
  return (
    <ToolPage categorySlug="business" toolSlug="profit-margin" content={content}>
      <ProfitMarginTool />
    </ToolPage>
  );
}
