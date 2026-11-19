import ToolPage from "@/components/calculator/ToolPage";
import CreditCardInterestTool, { content } from "@/features/finance/credit-card-interest";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "credit-card-interest", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="credit-card-interest" content={content}>
      <CreditCardInterestTool />
    </ToolPage>
  );
}
