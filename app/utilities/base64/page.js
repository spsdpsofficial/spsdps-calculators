import ToolPage from "@/components/calculator/ToolPage";
import Base64Tool, { content } from "@/features/utilities/base64";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "base64", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="base64" content={content}>
      <Base64Tool />
    </ToolPage>
  );
}
