import LegalPage from "@/components/layout/LegalPage";
import { LEGAL } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";

const page = LEGAL.disclaimer;

export const metadata = buildMetadata({ title: page.title, description: page.description, path: page.path });

export default function Page() {
  return <LegalPage page={page} path={page.path} />;
}
