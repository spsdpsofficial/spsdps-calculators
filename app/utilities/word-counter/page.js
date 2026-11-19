import ToolPage from "@/components/calculator/ToolPage";
import WordCounterTool, { content } from "@/features/utilities/word-counter";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "word-counter", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="word-counter" content={content}>
      <WordCounterTool />
    </ToolPage>
  );
}
