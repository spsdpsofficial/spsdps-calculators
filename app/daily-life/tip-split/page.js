import ToolPage from "@/components/calculator/ToolPage";
import TipSplitTool, { content } from "@/features/daily-life/tip-split";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "tip-split", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="tip-split" content={content}>
      <TipSplitTool />
    </ToolPage>
  );
}
