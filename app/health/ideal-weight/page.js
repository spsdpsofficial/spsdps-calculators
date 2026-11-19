import ToolPage from "@/components/calculator/ToolPage";
import IdealWeightTool, { content } from "@/features/health/ideal-weight";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "ideal-weight", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="ideal-weight" content={content}>
      <IdealWeightTool />
    </ToolPage>
  );
}
