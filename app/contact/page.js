import ContactForm from "@/components/contact/ContactForm";
import LegalPage from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/constants/site";
import { LEGAL } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";

const page = LEGAL.contact;

export const metadata = buildMetadata({ title: page.title, description: page.description, path: page.path });

export default function Page() {
  const email = siteConfig.contactEmail;
  return (
    <LegalPage page={page} path={page.path}>
      <section>
        <h2 className="text-xl font-bold text-ink">Send us a message</h2>
        <p className="mt-3">
          Use the form for corrections, feedback or tool ideas. It goes only to{" "}
          <a href={`mailto:${email}`}>{email}</a>. {siteConfig.name} is made by {siteConfig.maker}.
        </p>
        <div className="mt-5 not-prose">
          <ContactForm email={email} />
        </div>
      </section>
    </LegalPage>
  );
}
