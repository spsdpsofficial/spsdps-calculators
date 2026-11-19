import ToolPage from "@/components/calculator/ToolPage";
import LeaveEncashmentTool, { content } from "@/features/salary-tax/leave-encashment";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("salary-tax", "leave-encashment", content);

export default function Page() {
  return (
    <ToolPage categorySlug="salary-tax" toolSlug="leave-encashment" content={content}>
      <LeaveEncashmentTool />
    </ToolPage>
  );
}
