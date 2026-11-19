import ToolPage from "@/components/calculator/ToolPage";
import PdfMergerTool, { content } from "@/features/utilities/pdf-merger";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "pdf-merger", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="pdf-merger" content={content}>
      <PdfMergerTool />
    </ToolPage>
  );
}
