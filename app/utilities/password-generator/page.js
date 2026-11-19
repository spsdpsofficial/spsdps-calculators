import ToolPage from "@/components/calculator/ToolPage";
import PasswordGeneratorTool, { content } from "@/features/utilities/password-generator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "password-generator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="password-generator" content={content}>
      <PasswordGeneratorTool />
    </ToolPage>
  );
}
