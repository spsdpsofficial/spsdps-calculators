import ToolPage from "@/components/calculator/ToolPage";
import PresentFutureValueTool, { content } from "@/features/finance/present-future-value";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "present-future-value", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="present-future-value" content={content}>
      <PresentFutureValueTool />
    </ToolPage>
  );
}
