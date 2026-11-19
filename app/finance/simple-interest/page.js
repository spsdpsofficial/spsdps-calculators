import ToolPage from "@/components/calculator/ToolPage";
import SimpleInterestTool, { content } from "@/features/finance/simple-interest";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "simple-interest", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="simple-interest" content={content}>
      <SimpleInterestTool />
    </ToolPage>
  );
}
