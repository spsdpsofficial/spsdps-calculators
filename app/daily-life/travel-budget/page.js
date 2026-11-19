import ToolPage from "@/components/calculator/ToolPage";
import TravelBudgetTool, { content } from "@/features/daily-life/travel-budget";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "travel-budget", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="travel-budget" content={content}>
      <TravelBudgetTool />
    </ToolPage>
  );
}
