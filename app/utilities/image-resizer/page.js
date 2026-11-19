import ToolPage from "@/components/calculator/ToolPage";
import ImageResizerTool, { content } from "@/features/utilities/image-resizer";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "image-resizer", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="image-resizer" content={content}>
      <ImageResizerTool />
    </ToolPage>
  );
}
