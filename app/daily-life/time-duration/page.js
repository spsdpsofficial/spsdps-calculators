import ToolPage from "@/components/calculator/ToolPage";
import TimeDurationTool, { content } from "@/features/daily-life/time-duration";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "time-duration", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="time-duration" content={content}>
      <TimeDurationTool />
    </ToolPage>
  );
}
