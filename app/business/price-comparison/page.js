import ToolPage from "@/components/calculator/ToolPage";
import PriceComparisonTool, { content } from "@/features/business/price-comparison";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("business", "price-comparison", content);

export default function Page() {
  return (
    <ToolPage categorySlug="business" toolSlug="price-comparison" content={content}>
      <PriceComparisonTool />
    </ToolPage>
  );
}
