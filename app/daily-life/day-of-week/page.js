import ToolPage from "@/components/calculator/ToolPage";
import DayOfWeekTool, { content } from "@/features/daily-life/day-of-week";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "day-of-week", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="day-of-week" content={content}>
      <DayOfWeekTool />
    </ToolPage>
  );
}
