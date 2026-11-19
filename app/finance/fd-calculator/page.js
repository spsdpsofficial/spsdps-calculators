import ToolPage from "@/components/calculator/ToolPage";
import FdCalculatorTool, { content } from "@/features/finance/fd-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "fd-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="fd-calculator" content={content}>
      <FdCalculatorTool />
    </ToolPage>
  );
}
