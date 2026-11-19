import ToolPage from "@/components/calculator/ToolPage";
import ProteinIntakeTool, { content } from "@/features/health/protein-intake";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("health", "protein-intake", content);

export default function Page() {
  return (
    <ToolPage categorySlug="health" toolSlug="protein-intake" content={content}>
      <ProteinIntakeTool />
    </ToolPage>
  );
}
