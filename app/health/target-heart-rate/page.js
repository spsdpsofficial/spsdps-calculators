import ToolPage from "@/components/calculator/ToolPage";
import TargetHeartRateTool, { content } from "@/features/health/target-heart-rate";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "target-heart-rate", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="target-heart-rate" content={content}>
      <TargetHeartRateTool />
    </ToolPage>
  );
}
