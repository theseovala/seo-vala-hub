import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SEO Vala" },
      { name: "description", content: "How SEO Vala handles account, business, review, Google and AI data." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPage type="privacy" title="Privacy Policy" intro="This policy explains how SEO Vala handles information when you use our global review-intelligence SaaS, including when you connect an existing Google Business Profile. It is written for international users and applies subject to the laws that apply to you.">
      <h2 id="information-we-collect">Information we collect</h2>
      <p>We may collect account details such as your name, work email, authentication identifiers, and workspace preferences. We collect business and location information you submit or authorize us to access, including business names, addresses, ratings, location identifiers, review metadata, review text, scan links, case notes, reports, status updates, and support messages.</p>
      <p>We also receive technical information such as IP address, browser and device information, approximate region, timestamps, diagnostic events, and logs needed to secure and operate the service. We use cookies or similar storage for authentication, session continuity, security, preferences, and essential product operation.</p>

      <h2 id="how-we-use-information">How we use information</h2>
      <p>We use information to provide, secure, maintain, troubleshoot, and improve the service; connect authorized accounts; discover locations and reviews; normalize and deduplicate review records; produce scans, reports, status tracking, exports, notifications, and support; prevent abuse; and meet legal obligations. Where applicable, our legal bases may include contract performance, legitimate interests, consent, and compliance with law.</p>
      <p>AI features process review and business context to produce assistive policy analysis. AI output is informational, is not legal advice, and is not a guarantee that a platform will remove a review or accept a report.</p>

      <h2 id="google-business-profile-data">Google Business Profile data</h2>
      <p>You voluntarily authorize Google access through OAuth. We request only permissions needed for the connected functionality, including the <code>business.manage</code> scope where configured. We do not ask for, receive, or store your Google password. Google Business Profile data is accessed only for accounts and businesses you authorize and is not used for unrelated purposes.</p>
      <p>OAuth access and refresh credentials are handled server-side, encrypted at rest using application-managed protection, and are not intentionally exposed in browsers, URLs, page content, or logs. You can disconnect Google from the Locations area. You can also revoke access from your Google Account. Google is an independent third-party service; SEO Vala is not affiliated with, sponsored by, or endorsed by Google. Google names and trademarks remain Google’s property.</p>
      <p>Google API data is handled subject to Google’s applicable API Services User Data Policy, Business Profile API policies, retention restrictions, and Google’s own terms. Google may limit, change, or withdraw access and may independently decide whether content violates its policies.</p>

      <h2 id="sharing-and-international-transfers">Sharing and international transfers</h2>
      <p>We may share information with infrastructure, authentication, database, email, analytics, security, hosting, AI, and support providers acting on our instructions; with professional advisers; with authorities where required; or as part of a reorganization, merger, or asset transfer subject to applicable law. We do not sell personal information for money. Where applicable, we do not share personal information for cross-context behavioral advertising.</p>
      <p>Providers and operations may be located in countries different from yours. Where required, we use appropriate contractual, organizational, or legal safeguards for international transfers.</p>

      <h2 id="security-and-retention">Security and retention</h2>
      <p>We use access controls, user-scoped authorization, row-level security where configured, server-side privileged operations, encrypted token handling, validation, and monitoring. No method is completely secure, so do not submit information you are not authorized to share.</p>
      <p>We retain information for as long as needed to provide the service, meet legal and accounting obligations, resolve disputes, enforce terms, maintain audit records, and honor applicable Google retention restrictions. We delete or de-identify information when it is no longer needed, subject to backups, legal requirements, fraud prevention, and platform restrictions.</p>

      <h2 id="your-rights-and-choices">Your rights and choices</h2>
      <p>Subject to applicable law, you may request access, correction, deletion, portability, restriction, objection, withdrawal of consent, or information about processing. GDPR/UK GDPR rights may apply to people in those regions. CCPA/CPRA rights may apply to California residents. India’s DPDP rights may apply to individuals in India. We do not discriminate for exercising rights.</p>
      <p>You can disconnect Google in the authenticated Locations area, delete your account where that feature is available, or contact us to request deletion of applicable data. Requests should identify the account and the specific request without sending passwords, access tokens, or unnecessary sensitive information.</p>

      <h2 id="children-and-policy-changes">Children and policy changes</h2>
      <p>The service is intended for business users and is not directed to children under the minimum age required by applicable law. We do not knowingly collect children’s data. We may update this policy from time to time and will update the effective date; material changes may be communicated through the service or email where appropriate.</p>

      <h2 id="contact">Contact</h2>
      <p>For privacy, deletion, or data-protection requests, contact the business owner through the product’s support/contact channel. The owner must replace this placeholder with the official legal entity name, privacy email, postal address, and DPO or representative details where required before publication.</p>
    </LegalPage>
  );
}
