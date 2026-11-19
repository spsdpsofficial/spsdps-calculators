import ToolPage from "@/components/calculator/ToolPage";
import OvulationTool, { content } from "@/features/health/ovulation";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "ovulation", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="ovulation" content={content}>
      <OvulationTool />
    </ToolPage>
  );
}
