import ToolPage from "@/components/calculator/ToolPage";
import QrCodeGeneratorTool, { content } from "@/features/utilities/qr-code-generator";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("utilities", "qr-code-generator", content);

export default function Page() {
  return (
    <ToolPage categorySlug="utilities" toolSlug="qr-code-generator" content={content}>
      <QrCodeGeneratorTool />
    </ToolPage>
  );
}
