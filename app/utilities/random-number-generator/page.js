import ToolPage from "@/components/calculator/ToolPage";
import RandomNumberGeneratorTool, { content } from "@/features/utilities/random-number-generator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "random-number-generator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="random-number-generator" content={content}>
      <RandomNumberGeneratorTool />
    </ToolPage>
  );
}
