import ToolPage from "@/components/calculator/ToolPage";
import PdfCompressorTool, { content } from "@/features/utilities/pdf-compressor";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "pdf-compressor", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="pdf-compressor" content={content}>
      <PdfCompressorTool />
    </ToolPage>
  );
}
