import ToolPage from "@/components/calculator/ToolPage";
import DateDifferenceTool, { content } from "@/features/daily-life/date-difference";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "date-difference", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="date-difference" content={content}>
      <DateDifferenceTool />
    </ToolPage>
  );
}
