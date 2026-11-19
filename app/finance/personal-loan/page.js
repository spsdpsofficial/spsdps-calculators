import ToolPage from "@/components/calculator/ToolPage";
import PersonalLoanTool, { content } from "@/features/finance/personal-loan";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "personal-loan", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="personal-loan" content={content}>
      <PersonalLoanTool />
    </ToolPage>
  );
}
