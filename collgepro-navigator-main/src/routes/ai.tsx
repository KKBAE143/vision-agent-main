import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mic,
  MonitorSmartphone,
  Lightbulb,
  BookOpenCheck,
  Code2,
  FileText,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AppShell, Card, PageHeader, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "AI Hub — CollgePro Navigator" },
      { name: "description", content: "All your AI study tools in one place: mock viva, presentation practice, idea generator, tutor, code reviewer, report writer and flashcards." },
    ],
  }),
  component: AIHub,
});

const hero = [
  {
    to: "/ai-viva",
    title: "AI Mock Viva",
    desc: "Voice-led oral practice. Instant scoring, follow-ups, and Hinglish support.",
    icon: Mic,
    tag: "Signature",
  },
  {
    to: "/ai-presentation",
    title: "AI Presentation Mock",
    desc: "Present live to AI faculty. Real-time feedback on clarity, pace, and coverage.",
    icon: MonitorSmartphone,
    tag: "Signature",
  },
] as const;

const tools = [
  { title: "Project Idea Generator", desc: "5 ranked project ideas from your branch + interests.", icon: Lightbulb, badge: "New" },
  { title: "Concept Tutor", desc: "Ask any concept in Hinglish — streaming Q&A.", icon: BookOpenCheck, badge: "New" },
  { title: "Code / Architecture Reviewer", desc: "Paste a repo URL — get review + diagram.", icon: Code2, badge: "New" },
  { title: "Report & Synopsis Writer", desc: "Auto-draft abstract, synopsis and report sections.", icon: FileText, badge: "New" },
  { title: "Flashcard Generator", desc: "Turn any topic into spaced-repetition flashcards.", icon: Layers, badge: "New" },
] as const;

function AIHub() {
  return (
    <AppShell>
      <PageHeader
        title="AI Hub"
        subtitle="Every AI feature that helps you learn, build, and defend your work — one tap away."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {hero.map((h) => {
          const I = h.icon;
          return (
            <Link
              key={h.to}
              to={h.to}
              className="group relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                  {h.tag}
                </span>
                <Sparkles className="h-4 w-4 opacity-80" />
              </div>
              <div className="mt-8 grid h-14 w-14 place-items-center rounded-2xl bg-primary-foreground/15">
                <I className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-tight">{h.title}</h2>
              <p className="mt-2 max-w-sm text-sm text-primary-foreground/85">{h.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-4 py-2.5 text-sm font-semibold text-primary">
                Open <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">More AI tools</h3>
            <p className="mt-1 text-xs text-muted-foreground">Everything else that helps you ship better projects.</p>
          </div>
          <Badge tone="primary">5 new</Badge>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => {
            const I = t.icon;
            return (
              <div
                key={t.title}
                className="group rounded-xl border border-border p-4 transition-colors hover:border-primary hover:bg-primary-soft/40"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
                    <I className="h-5 w-5" />
                  </div>
                  <Badge tone="success">{t.badge}</Badge>
                </div>
                <div className="mt-4 font-semibold">{t.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
                <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Try it <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}