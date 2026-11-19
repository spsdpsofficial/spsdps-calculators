import ToolPage from "@/components/calculator/ToolPage";
import MacronutrientTool, { content } from "@/features/health/macronutrient";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "macronutrient", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="macronutrient" content={content}>
      <MacronutrientTool />
    </ToolPage>
  );
}
