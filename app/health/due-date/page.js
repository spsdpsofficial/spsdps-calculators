import ToolPage from "@/components/calculator/ToolPage";
import DueDateTool, { content } from "@/features/health/due-date";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "due-date", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="due-date" content={content}>
      <DueDateTool />
    </ToolPage>
  );
}
