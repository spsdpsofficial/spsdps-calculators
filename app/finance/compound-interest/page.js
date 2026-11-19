import ToolPage from "@/components/calculator/ToolPage";
import CompoundInterestTool, { content } from "@/features/finance/compound-interest";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "compound-interest", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="compound-interest" content={content}>
      <CompoundInterestTool />
    </ToolPage>
  );
}
