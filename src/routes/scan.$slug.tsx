import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ExternalLink, FileDown, MessageSquare, Star } from "lucide-react";

import { Wordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/lib/analysis-types";
import { VERDICT_LABELS } from "@/lib/case-types";
import {
  PUBLIC_PROGRESS,
  PUBLIC_PROGRESS_STEPS,
  getMyCaseReplyAccess,
  getPublicCaseDetail,
  setCaseOwnerReply,
} from "@/lib/public-status.functions";

export const Route = createFileRoute("/scan/$slug")({
  loader: async ({ params }) => {
    const detail = await getPublicCaseDetail({ data: { slug: params.slug } });
    if (!detail) throw notFound();
    return detail;
  },
  errorComponent: () => (
    <div className="page-shell">
      <main className="page-main">
        <h1 className="page-title">This case page is unavailable</h1>
        <p className="page-lede">Please refresh the page and try again.</p>
      </main>
    </div>
  ),
  notFoundComponent: () => (
    <div className="page-shell">
      <main className="page-main">
        <h1 className="page-title">Case not published</h1>
        <p className="page-lede">
          This case is either private or no longer published by its owner.
        </p>
        <Link to="/scan" className="page-back mt-6 inline-flex">
          <ArrowLeft className="size-4" /> Back to the status board
        </Link>
      </main>
    </div>
  ),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case unavailable — SEO Vala" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.headline} — SEO Vala case detail`;
    const description = loaderData.plainSummary.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: PublicCaseDetailPage,
});

function Bullets({ title, items }: { title: string; items?: string[] | undefined }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-5">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function PublicCaseDetailPage() {
  const detail = Route.useLoaderData();
  const progress = PUBLIC_PROGRESS[detail.status];
  const analysis = detail.analysis;

  return (
    <div className="page-shell">
      <header className="page-header">
        <Link to="/" aria-label="SEO Vala home">
          <Wordmark />
        </Link>
        <Link to="/scan" className="page-back">
          <ArrowLeft className="size-4" /> Status board
        </Link>
      </header>

      <main className="page-main">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {detail.platform === "google" ? "Google Maps" : detail.platform} ·{" "}
          {detail.locationName}
        </p>
        <h1 className="page-title mt-1">{detail.headline}</h1>
        <p className="page-lede">{detail.plainSummary}</p>

        <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-bold text-ink">Site</h2>
          <p className="mt-1 text-sm text-ink">{detail.locationName}</p>
          {detail.locationAddress ? (
            <p className="text-sm text-muted-foreground">{detail.locationAddress}</p>
          ) : null}
          {detail.reviewUrl || detail.sourceUrl ? (
            <a
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              href={detail.reviewUrl || detail.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Open the listing <ExternalLink className="size-4" />
            </a>
          ) : null}

          <p className="mt-4 text-sm text-ink">{progress.label}</p>
          <div
            className="mt-2 flex gap-1.5"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={PUBLIC_PROGRESS_STEPS}
            aria-valuenow={progress.step}
            aria-label={`Progress: ${progress.label}`}
          >
            {Array.from({ length: PUBLIC_PROGRESS_STEPS }, (_, index) => (
              <span
                key={index}
                className={`h-1.5 flex-1 rounded-full ${
                  index < progress.step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Last update:{" "}
            {new Date(detail.updatedAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-bold text-ink">The review</h2>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-ink">{detail.authorName || "Reviewer"}</span>
            {detail.reviewRating !== null ? (
              <span className="inline-flex items-center gap-1">
                <Star className="size-4 text-warn" aria-hidden />
                {detail.reviewRating}/5
              </span>
            ) : null}
            {detail.reviewRelativeTime ? <span>· {detail.reviewRelativeTime}</span> : null}
          </p>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink">
            {detail.reviewText || "No review text was captured."}
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-bold text-ink">AI policy analysis</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Verdict" value={VERDICT_LABELS[detail.verdict] ?? detail.verdict} />
            <Stat label="Confidence" value={`${detail.confidence}%`} />
            <Stat label="Severity" value={detail.severity || "—"} />
            <Stat
              label="Problem type"
              value={CATEGORY_LABELS[detail.violationCategory] ?? "—"}
            />
          </dl>

          <Bullets title="What supports reporting it" items={analysis?.evidence} />
          <Bullets title="What argues against it" items={analysis?.counterEvidence} />
          <Bullets title="What we still don't know" items={analysis?.missingEvidence} />

          {analysis?.challenge ? (
            <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-sm font-semibold text-ink">The AI argued the other side</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {analysis.challenge}
              </p>
            </div>
          ) : null}

          {analysis?.recommendedAction ? (
            <div className="mt-4 rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-ink">Recommended action</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {analysis.recommendedAction}
              </p>
            </div>
          ) : null}
        </section>

        <OwnerReply
          caseId={detail.id}
          initialReply={detail.ownerReply}
          initialReplyAt={detail.ownerReplyAt}
        />

        <section className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
          <h2 className="flex items-center gap-2 text-base font-bold text-ink">
            <FileDown className="size-4 text-primary" aria-hidden />
            PDF report
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The PDF report for this case can only be downloaded by the owner of the case, from
            their scan reports page.
          </p>
          <Link
            to="/auth"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Sign in to download
          </Link>
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          Statuses on this page are confirmed by the case owner. Google gives no API for report
          outcomes, so nothing here is an automated platform confirmation.
        </p>
      </main>
    </div>
  );
}

function OwnerReply({
  caseId,
  initialReply,
  initialReplyAt,
}: {
  caseId: string;
  initialReply: string | null;
  initialReplyAt: string | null;
}) {
  const checkAccess = useServerFn(getMyCaseReplyAccess);
  const saveReply = useServerFn(setCaseOwnerReply);

  const [isOwner, setIsOwner] = useState(false);
  const [reply, setReply] = useState(initialReply);
  const [replyAt, setReplyAt] = useState(initialReplyAt);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(initialReply ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    checkAccess({ data: { id: caseId } })
      .then((result) => {
        if (active) setIsOwner(result.isOwner);
      })
      .catch(() => {
        if (active) setIsOwner(false);
      });
    return () => {
      active = false;
    };
  }, [caseId, checkAccess]);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const result = await saveReply({ data: { id: caseId, reply: draft } });
      setReply(result.reply);
      setReplyAt(result.reply ? new Date().toISOString() : null);
      setIsEditing(false);
    } catch {
      setError("The reply could not be saved. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (!isOwner && !reply) return null;

  return (
    <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-base font-bold text-ink">
        <MessageSquare className="size-4 text-primary" aria-hidden />
        Owner's reply
      </h2>

      {reply && !isEditing ? (
        <>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink">{reply}</p>
          {replyAt ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Posted {new Date(replyAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
            </p>
          ) : null}
        </>
      ) : null}

      {!reply && !isEditing ? (
        <p className="mt-2 text-sm text-muted-foreground">
          You have not published a reply to this review yet.
        </p>
      ) : null}

      {isOwner && !isEditing ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setDraft(reply ?? "");
              setIsEditing(true);
            }}
          >
            {reply ? "Edit reply" : "Reply to this review"}
          </Button>
          {reply ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={() => {
                setDraft("");
                void (async () => {
                  setBusy(true);
                  setError(null);
                  try {
                    await saveReply({ data: { id: caseId, reply: "" } });
                    setReply(null);
                    setReplyAt(null);
                  } catch {
                    setError("The reply could not be removed. Please try again.");
                  } finally {
                    setBusy(false);
                  }
                })();
              }}
            >
              Remove reply
            </Button>
          ) : null}
        </div>
      ) : null}

      {isOwner && isEditing ? (
        <div className="mt-4">
          <label htmlFor="owner-reply" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Your public reply
          </label>
          <textarea
            id="owner-reply"
            value={draft}
            maxLength={2000}
            rows={5}
            onChange={(event) => setDraft(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background p-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Write the reply visitors will see on this page."
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" size="sm" disabled={busy} onClick={() => void submit()}>
              {busy ? "Saving…" : "Publish reply"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={() => {
                setIsEditing(false);
                setDraft(reply ?? "");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 px-3.5 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold capitalize text-ink">{value}</dd>
    </div>
  );
}
