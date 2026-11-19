import ToolPage from "@/components/calculator/ToolPage";
import TdsTool, { content } from "@/features/salary-tax/tds";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "tds", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="tds" content={content}>
      <TdsTool />
    </ToolPage>
  );
}
