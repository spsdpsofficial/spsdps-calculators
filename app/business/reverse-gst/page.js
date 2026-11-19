import ToolPage from "@/components/calculator/ToolPage";
import ReverseGstTool, { content } from "@/features/business/reverse-gst";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("business", "reverse-gst", content);

export default function Page() {
  return (
    <ToolPage categorySlug="business" toolSlug="reverse-gst" content={content}>
      <ReverseGstTool />
    </ToolPage>
  );
}
