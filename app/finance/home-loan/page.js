import ToolPage from "@/components/calculator/ToolPage";
import HomeLoanTool, { content } from "@/features/finance/home-loan";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("finance", "home-loan", content);

export default function Page() {
  return (
    <ToolPage categorySlug="finance" toolSlug="home-loan" content={content}>
      <HomeLoanTool />
    </ToolPage>
  );
}
