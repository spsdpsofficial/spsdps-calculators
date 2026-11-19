import ToolPage from "@/components/calculator/ToolPage";
import FuelCostTool, { content } from "@/features/daily-life/fuel-cost";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "fuel-cost", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="fuel-cost" content={content}>
      <FuelCostTool />
    </ToolPage>
  );
}
