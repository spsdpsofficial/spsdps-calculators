import ToolPage from "@/components/calculator/ToolPage";
import UnitConverterTool, { content } from "@/features/daily-life/unit-converter";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "unit-converter", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="unit-converter" content={content}>
      <UnitConverterTool />
    </ToolPage>
  );
}
