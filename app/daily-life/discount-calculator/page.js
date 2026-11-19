import ToolPage from "@/components/calculator/ToolPage";
import DiscountCalculatorTool, { content } from "@/features/daily-life/discount-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "discount-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="discount-calculator" content={content}>
      <DiscountCalculatorTool />
    </ToolPage>
  );
}
