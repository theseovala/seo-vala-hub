import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Scale } from "lucide-react";
import type { ReactNode } from "react";

export const LEGAL_LAST_UPDATED = "20 September 2026";

export function LegalPage({
  type,
  title,
  intro,
  children,
}: {
  type: "privacy" | "terms";
  title: string;
  intro: string;
  children: ReactNode;
}) {
  const sections = type === "privacy"
    ? ["Information we collect", "How we use information", "Google Business Profile data", "Sharing and international transfers", "Security and retention", "Your rights and choices", "Children and policy changes", "Contact"]
    : ["Acceptance and eligibility", "Accounts and security", "Using the service", "Google authorization", "AI and review analysis", "Intellectual property and content", "Third-party services", "Availability, suspension and termination", "Disclaimers and liability", "Changes and contact"];

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-background/90 px-5 py-5 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-ink">SEO Vala</Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-ink">
            <ArrowLeft className="size-4" /> Back to home
          </Link>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-20">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              {type === "privacy" ? <ShieldCheck className="size-4 text-primary" /> : <Scale className="size-4 text-primary" />}
              On this page
            </p>
            <nav className="mt-4 space-y-2" aria-label={`${title} sections`}>
              {sections.map((section) => (
                <a key={section} href={`#${slugify(section)}`} className="block text-sm leading-relaxed text-muted-foreground hover:text-ink">
                  {section}
                </a>
              ))}
            </nav>
          </div>
        </aside>
        <article className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{type === "privacy" ? "Trust & privacy" : "Service terms"}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
          <div className="mt-5 text-sm text-muted-foreground">
            Effective date and last updated: <strong className="text-ink">{LEGAL_LAST_UPDATED}</strong>
          </div>
          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-ink">
            {children}
          </div>
          <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-ink">Business details to be completed:</strong> SEO Vala’s legal entity name, registered address, governing law, privacy contact, and any DPO contact are intentionally not invented here. The business owner should replace this notice before relying on these documents as final legal terms.
          </div>
        </article>
      </div>
    </main>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
