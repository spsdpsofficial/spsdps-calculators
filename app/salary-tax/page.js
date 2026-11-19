import CategoryPage from "@/components/calculator/CategoryPage";
import { buildCategoryMetadata } from "@/lib/seo/metadata";

export const metadata = buildCategoryMetadata("salary-tax");

export default function Page() {
  return <CategoryPage categorySlug="salary-tax" />;
}
