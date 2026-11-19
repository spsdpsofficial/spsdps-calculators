import ToolPage from "@/components/calculator/ToolPage";
import HomeLoanEligibilityTool, { content } from "@/features/finance/home-loan-eligibility";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "home-loan-eligibility", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="home-loan-eligibility" content={content}>
      <HomeLoanEligibilityTool />
    </ToolPage>
  );
}
