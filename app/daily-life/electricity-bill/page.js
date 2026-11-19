import ToolPage from "@/components/calculator/ToolPage";
import ElectricityBillTool, { content } from "@/features/daily-life/electricity-bill";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("daily-life", "electricity-bill", content);

export default function Page() {
  return (
    <ToolPage categorySlug="daily-life" toolSlug="electricity-bill" content={content}>
      <ElectricityBillTool />
    </ToolPage>
  );
}
