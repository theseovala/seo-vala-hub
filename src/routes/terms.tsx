import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — SEO Vala" },
      { name: "description", content: "Terms governing use of the SEO Vala review-intelligence service." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage type="terms" title="Terms & Conditions" intro="These terms govern access to SEO Vala, a review-intelligence and reporting service for businesses. By using the service, you agree to these terms subject to applicable law.">
      <h2 id="acceptance-and-eligibility">Acceptance and eligibility</h2>
      <p>You must accept these terms to use the service. You represent that you are legally able to enter a contract and are using the service for a business or professional purpose. If you use the service for an organization, you represent that you can bind it.</p>

      <h2 id="accounts-and-security">Accounts and security</h2>
      <p>Provide accurate account information, keep credentials and sessions secure, and promptly notify us of unauthorized access. You are responsible for activity under your account and for ensuring that people who use your workspace are authorized.</p>

      <h2 id="using-the-service">Using the service</h2>
      <p>SEO Vala may help you discover publicly available Google review information, connect an authorized Business Profile, organize review records, analyze policy signals, prepare reports, and track outcomes. Features, limits, availability, pricing, and plans may change. Any subscription or payment terms shown at checkout or in an order form govern the applicable purchase. Refunds and cancellations follow the actual policy presented for that plan; no separate refund promise is made here.</p>
      <p>You must use the service only for lawful purposes and only with information and businesses you are authorized to process. Do not scrape or request data beyond permitted APIs, evade limits, submit deceptive reports, create fake reviews or profiles, impersonate another person, interfere with the service, probe security, upload malware, or use the service to harass, discriminate, defame, or violate privacy.</p>

      <h2 id="google-authorization">Google authorization</h2>
      <p>You voluntarily authorize Google access through OAuth and must have owner or manager-level authority for each connected Business Profile. We do not ask for your Google password. You are responsible for the Google account, permissions, redirect/consent decisions, and accuracy of the businesses you connect. You may disconnect access in SEO Vala or revoke it through Google.</p>
      <p>Google is independent from SEO Vala. We are not affiliated with, sponsored by, or endorsed by Google, and Google trademarks remain Google’s property. Google may limit access, change APIs, impose quotas, or make the final decision about review eligibility, reports, removal, search visibility, and profile access.</p>

      <h2 id="ai-and-review-analysis">AI and review analysis</h2>
      <p>AI-generated analysis, summaries, classifications, recommendations, and report drafts are assistive and informational only. They are not legal advice, do not establish that a review violates a policy, and do not guarantee acceptance, removal, ranking improvement, or reputation improvement. Review text may contain instructions or claims that are untrusted user content; you remain responsible for checking the evidence and deciding what to submit.</p>

      <h2 id="intellectual-property-and-content">Intellectual property and content</h2>
      <p>SEO Vala, its software, design, documentation, and service marks belong to the applicable owner or licensors. You retain rights in content you submit and grant us only the limited rights needed to operate, secure, support, and improve the service as described in the Privacy Policy. Google content remains subject to Google’s terms and API policies.</p>

      <h2 id="third-party-services">Third-party services</h2>
      <p>The service depends on providers such as Supabase, Google, hosting, email, and AI services. Their availability, terms, policies, and decisions are outside our control. We do not guarantee API availability, uninterrupted service, complete review coverage, or that data will remain available after a provider changes access.</p>

      <h2 id="availability-suspension-and-termination">Availability, suspension and termination</h2>
      <p>We may suspend or terminate access for security, abuse, non-payment, legal requirements, provider restrictions, or material breach. You may stop using the service or cancel under the applicable plan terms. After termination, we may delete data according to the Privacy Policy, backups, legal duties, and Google retention restrictions.</p>

      <h2 id="disclaimers-and-liability">Disclaimers and liability</h2>
      <p>To the maximum extent permitted by applicable law, the service is provided on an “as available” and “as is” basis without warranties that it will be uninterrupted, error-free, complete, or achieve a particular business result. We do not promise Google review removal, Google approval, ranking improvement, reputation improvement, profile access, or any particular outcome.</p>
      <p>To the maximum extent permitted by law, the applicable owner will not be liable for indirect, incidental, special, consequential, exemplary, or loss-of-profit damages arising from use of the service. Any direct-liability cap, mandatory consumer rights, and exclusions will be completed in the final business-specific version of these terms.</p>
      <p>You agree to indemnify the applicable owner against claims arising from your unauthorized data, misuse, violation of law or third-party rights, or breach of these terms, subject to applicable law.</p>

      <h2 id="changes-and-contact">Changes and contact</h2>
      <p>We may update these terms by posting a revised version and changing the effective date. Continued use after a legally effective change means you accept the revised terms. Governing law, jurisdiction, dispute resolution, legal entity name, registered address, and official contact details are intentionally placeholders and must be supplied by the business owner before publication.</p>
    </LegalPage>
  );
}
