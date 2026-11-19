import ToolPage from "@/components/calculator/ToolPage";
import CaseConverterTool, { content } from "@/features/utilities/case-converter";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "case-converter", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="case-converter" content={content}>
      <CaseConverterTool />
    </ToolPage>
  );
}
