import ToolPage from "@/components/calculator/ToolPage";
import LoanPrepaymentTool, { content } from "@/features/finance/loan-prepayment";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "loan-prepayment", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="loan-prepayment" content={content}>
      <LoanPrepaymentTool />
    </ToolPage>
  );
}
