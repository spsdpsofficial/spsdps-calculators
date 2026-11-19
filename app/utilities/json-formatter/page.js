import ToolPage from "@/components/calculator/ToolPage";
import JsonFormatterTool, { content } from "@/features/utilities/json-formatter";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "json-formatter", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="json-formatter" content={content}>
      <JsonFormatterTool />
    </ToolPage>
  );
}
