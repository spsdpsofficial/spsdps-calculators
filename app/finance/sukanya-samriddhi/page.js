import ToolPage from "@/components/calculator/ToolPage";
import SukanyaSamriddhiTool, { content } from "@/features/finance/sukanya-samriddhi";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "sukanya-samriddhi", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="sukanya-samriddhi" content={content}>
      <SukanyaSamriddhiTool />
    </ToolPage>
  );
}
