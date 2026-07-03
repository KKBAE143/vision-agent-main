import { createFileRoute, Link } from "@tanstack/react-router";
import { Mic, Sparkles, Play, TrendingUp } from "lucide-react";
import { AppShell, Card, PageHeader, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/ai-viva")({
  head: () => ({
    meta: [
      { title: "AI Mock Viva — CollgePro Navigator" },
      { name: "description", content: "Practice viva questions with AI in English, Hindi or Hinglish. Get instant scoring and tips." },
    ],
  }),
  component: AiVivaHub,
});

const sessions = [
  { id: "s1", subject: "DBMS — Normalization", score: 88, date: "15 Jun", tone: "success" as const, duration: 20 },
  { id: "s2", subject: "Computer Networks — OSI Layers", score: 76, date: "12 Jun", tone: "warning" as const, duration: 15 },
  { id: "s3", subject: "Operating Systems — Deadlocks", score: 92, date: "08 Jun", tone: "success" as const, duration: 30 },
  { id: "s4", subject: "Project Viva — Smart Attend", score: 71, date: "05 Jun", tone: "warning" as const, duration: 25 },
];

function AiVivaHub() {
  return (
    <AppShell>
      <PageHeader title="AI Mock Viva" subtitle="Practice oral exams, get instant scoring and improvement tips." />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <Badge tone="muted"><span className="text-primary">AI Powered</span></Badge>
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">Begin a new mock viva</h2>
          <p className="mt-2 max-w-md text-sm text-primary-foreground/90">
            Pick a subject or project, set difficulty, and start answering. Voice or text — your call.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/ai-viva/new" className="flex items-center gap-2 rounded-xl bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary">
              <Mic className="h-4 w-4" /> Configure Session
            </Link>
            <Link to="/ai-viva/session/$id" params={{ id: "demo" }} className="flex items-center gap-2 rounded-xl bg-primary-foreground/15 px-5 py-3 text-sm font-medium">
              <Play className="h-4 w-4" /> Quick 5-min Viva
            </Link>
          </div>
        </Card>
        <Card className="lg:col-span-5">
          <h3 className="text-base font-semibold">Performance Snapshot</h3>
          <div className="mt-5 flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold tracking-tight">84%</div>
              <div className="mt-1 flex items-center gap-1 text-xs font-medium text-success">
                <TrendingUp className="h-3 w-3" /> 6% vs last week
              </div>
            </div>
            <div className="flex h-20 items-end gap-1">
              {[60, 75, 65, 80, 72, 88, 92].map((v, i) => (
                <div key={i} className="w-3 rounded-t bg-primary" style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              { l: "Sessions", v: "12" },
              { l: "Questions", v: "186" },
              { l: "Top Subject", v: "OS" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-secondary p-3">
                <div className="text-base font-bold">{s.v}</div>
                <div className="text-[11px] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <h3 className="text-base font-semibold">Recent Sessions</h3>
        <div className="mt-4 divide-y divide-border">
          {sessions.map((s) => (
            <div key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3.5">
              <div className="min-w-0">
                <div className="truncate font-semibold">{s.subject}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.date} · {s.duration} min</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={s.tone}>{s.score}%</Badge>
                <button className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-medium">Review</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}