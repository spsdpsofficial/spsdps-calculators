import ToolPage from "@/components/calculator/ToolPage";
import BodyFatTool, { content } from "@/features/health/body-fat";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "body-fat", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="body-fat" content={content}>
      <BodyFatTool />
    </ToolPage>
  );
}
