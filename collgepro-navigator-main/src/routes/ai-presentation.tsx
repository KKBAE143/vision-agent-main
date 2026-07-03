import { createFileRoute, Link } from "@tanstack/react-router";
import { MonitorSmartphone, Play, Upload } from "lucide-react";
import { AppShell, Card, PageHeader, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/ai-presentation")({
  head: () => ({
    meta: [
      { title: "AI Presentation Mock — CollgePro Navigator" },
      { name: "description", content: "Present to AI, share your screen, and get faculty-style real-time feedback." },
    ],
  }),
  component: AIPresentation,
});

function AIPresentation() {
  return (
    <AppShell>
      <PageHeader title="AI Presentation Mock" subtitle="Present to AI faculty, share your screen, get instant feedback." />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7 bg-primary text-primary-foreground">
          <Badge tone="muted"><span className="text-primary">Live Screen Review</span></Badge>
          <h2 className="mt-5 text-2xl font-bold tracking-tight">Defend like it's the real review</h2>
          <p className="mt-2 max-w-md text-sm text-primary-foreground/85">
            Share your screen, present your slides, and AI faculty asks follow-ups, scores clarity, and flags missing topics.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/ai-presentation" className="flex items-center gap-2 rounded-xl bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary">
              <Play className="h-4 w-4" /> Start Session
            </Link>
            <button className="flex items-center gap-2 rounded-xl bg-primary-foreground/15 px-5 py-3 text-sm font-medium">
              <Upload className="h-4 w-4" /> Upload PPT
            </button>
          </div>
        </Card>
        <Card className="lg:col-span-5">
          <h3 className="text-base font-semibold">Setup</h3>
          <div className="mt-4 space-y-3">
            <Row label="Project" value="Smart Attendance System" />
            <Row label="Type" value="Mid Review" />
            <Row label="Duration" value="10 minutes" />
            <Row label="Recording" value="Enabled" />
          </div>
          <button className="mt-6 w-full rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background">
            Begin Presentation
          </button>
        </Card>
      </div>

      <Card>
        <h3 className="text-base font-semibold">Past Sessions</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { p: "Smart Attend — Mid Review", score: 84, date: "20 Jun", tone: "success" as const },
            { p: "VisionAid — Final Demo", score: 76, date: "12 Jun", tone: "warning" as const },
            { p: "QuizGen — Internal", score: 91, date: "02 Jun", tone: "success" as const },
          ].map((s) => (
            <div key={s.p} className="rounded-xl border border-border p-4">
              <MonitorSmartphone className="h-5 w-5 text-muted-foreground" />
              <div className="mt-3 font-semibold">{s.p}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.date}</div>
              <div className="mt-3 flex items-center justify-between">
                <Badge tone={s.tone}>{s.score}%</Badge>
                <button className="text-xs font-medium text-muted-foreground hover:text-foreground">Review →</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}