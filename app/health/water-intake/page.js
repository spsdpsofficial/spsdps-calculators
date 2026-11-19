import ToolPage from "@/components/calculator/ToolPage";
import WaterIntakeTool, { content } from "@/features/health/water-intake";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "water-intake", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="water-intake" content={content}>
      <WaterIntakeTool />
    </ToolPage>
  );
}
