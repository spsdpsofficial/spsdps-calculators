import ToolPage from "@/components/calculator/ToolPage";
import OvertimeTool, { content } from "@/features/salary-tax/overtime";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "overtime", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="overtime" content={content}>
      <OvertimeTool />
    </ToolPage>
  );
}
