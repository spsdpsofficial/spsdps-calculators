import ToolPage from "@/components/calculator/ToolPage";
import EmiCalculator, { content } from "@/features/finance/emi-calculator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "emi-calculator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="emi-calculator" content={content}>
      <EmiCalculator />
    </ToolPage>
  );
}
