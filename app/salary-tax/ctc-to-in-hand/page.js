import ToolPage from "@/components/calculator/ToolPage";
import CtcToInHandTool, { content } from "@/features/salary-tax/ctc-to-in-hand";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "ctc-to-in-hand", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="ctc-to-in-hand" content={content}>
      <CtcToInHandTool />
    </ToolPage>
  );
}
