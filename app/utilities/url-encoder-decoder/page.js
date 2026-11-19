import ToolPage from "@/components/calculator/ToolPage";
import UrlEncoderDecoderTool, { content } from "@/features/utilities/url-encoder-decoder";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "url-encoder-decoder", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="url-encoder-decoder" content={content}>
      <UrlEncoderDecoderTool />
    </ToolPage>
  );
}
