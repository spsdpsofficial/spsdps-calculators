import ToolPage from "@/components/calculator/ToolPage";
import BreakEvenTool, { content } from "@/features/business/break-even";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("business", "break-even", content);

export default function Page() {
  return (
    <ToolPage categorySlug="business" toolSlug="break-even" content={content}>
      <BreakEvenTool />
    </ToolPage>
  );
}
