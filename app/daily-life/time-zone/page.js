import ToolPage from "@/components/calculator/ToolPage";
import TimeZoneTool, { content } from "@/features/daily-life/time-zone";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "time-zone", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="time-zone" content={content}>
      <TimeZoneTool />
    </ToolPage>
  );
}
