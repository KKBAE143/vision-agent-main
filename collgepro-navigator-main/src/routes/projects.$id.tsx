import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Share2, MoreHorizontal, Sparkles, CalendarCheck, Users, CheckCircle2, Clock } from "lucide-react";
import { AppShell, Card, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/projects/$id")({
  head: () => ({ meta: [{ title: "Project — CollgePro Navigator" }] }),
  component: ProjectDetail,
});

const tabs = ["Overview", "Tasks", "Timeline", "Team", "Files", "Viva Prep", "Activity"];

function ProjectDetail() {
  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Link to="/projects" className="grid h-9 w-9 place-items-center rounded-xl bg-card shadow-[var(--shadow-card)]">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="warning">PBL</Badge>
              <Badge tone="primary"><span className="h-1.5 w-1.5 rounded-full bg-current" /> In Progress</Badge>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Smart Attendance System</h1>
            <p className="mt-1 text-sm text-muted-foreground">Computer Networks · Semester 6</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button aria-label="More" className="grid h-10 w-10 place-items-center rounded-xl bg-secondary">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Card className="!p-2">
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                i === 0 ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <h3 className="text-base font-semibold">About this project</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A face-recognition based attendance system that automates roll call using a classroom camera.
            Uses OpenCV + a lightweight CNN for face detection, with attendance synced to a Firebase backend.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Python", "OpenCV", "Firebase", "React Native"].map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Tasks", v: "18 / 25", i: CheckCircle2 },
              { l: "Milestones", v: "3 / 6", i: CalendarCheck },
              { l: "Team", v: "4 members", i: Users },
              { l: "Due", v: "12 Jul", i: Clock },
            ].map((s) => {
              const I = s.i;
              return (
                <div key={s.l} className="rounded-xl bg-secondary p-3">
                  <I className="h-4 w-4 text-muted-foreground" />
                  <div className="mt-2 text-lg font-bold">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="lg:col-span-4 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium opacity-90">Project Progress</span>
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-36 w-36">
              <circle cx="60" cy="60" r="50" fill="none" stroke="oklch(1 0 0 / 0.2)" strokeWidth="12" />
              <circle
                cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - 0.72)}`}
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="66" textAnchor="middle" className="fill-current text-2xl font-bold">72%</text>
            </svg>
          </div>
          <Link to="/ai-viva/new" className="mt-4 block w-full rounded-xl bg-primary-foreground px-4 py-2.5 text-center text-sm font-semibold text-primary">
            Start AI Viva Practice
          </Link>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Tasks</h3>
          <button className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-medium">+ Add Task</button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { title: "To Do", tone: "muted" as const, items: [{ t: "Write project synopsis", a: "AR", p: "high" }, { t: "Setup Firebase project", a: "SK", p: "med" }] },
            { title: "In Progress", tone: "primary" as const, items: [{ t: "Train face detection model", a: "AR", p: "high" }, { t: "Build mobile UI", a: "NJ", p: "med" }] },
            { title: "Done", tone: "success" as const, items: [{ t: "Literature review", a: "AR", p: "low" }, { t: "Team formation", a: "SK", p: "low" }] },
          ].map((col) => (
            <div key={col.title} className="rounded-xl bg-secondary p-3">
              <div className="mb-3 flex items-center justify-between text-xs font-semibold">
                <Badge tone={col.tone}>{col.title}</Badge>
                <span className="text-muted-foreground">{col.items.length}</span>
              </div>
              <div className="space-y-2">
                {col.items.map((t) => (
                  <div key={t.t} className="rounded-lg bg-card p-3">
                    <div className="text-sm font-medium">{t.t}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="grid h-6 w-6 place-items-center rounded-full bg-secondary text-[10px] font-semibold">{t.a}</div>
                      <Badge tone={t.p === "high" ? "destructive" : t.p === "med" ? "warning" : "muted"}>{t.p}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}