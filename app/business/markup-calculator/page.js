import ToolPage from "@/components/calculator/ToolPage";
import MarkupCalculatorTool, { content } from "@/features/business/markup-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("business", "markup-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="business" toolSlug="markup-calculator" content={content}>
      <MarkupCalculatorTool />
    </ToolPage>
  );
}
