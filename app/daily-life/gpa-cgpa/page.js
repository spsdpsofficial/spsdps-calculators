import ToolPage from "@/components/calculator/ToolPage";
import GpaCgpaTool, { content } from "@/features/daily-life/gpa-cgpa";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "gpa-cgpa", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="gpa-cgpa" content={content}>
      <GpaCgpaTool />
    </ToolPage>
  );
}
