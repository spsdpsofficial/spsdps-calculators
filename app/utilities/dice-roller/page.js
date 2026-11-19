import ToolPage from "@/components/calculator/ToolPage";
import DiceRollerTool, { content } from "@/features/utilities/dice-roller";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "dice-roller", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="dice-roller" content={content}>
      <DiceRollerTool />
    </ToolPage>
  );
}
