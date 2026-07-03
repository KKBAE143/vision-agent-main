import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FolderKanban,
  Calendar,
  ListChecks,
  BrainCircuit,
  MonitorSmartphone,
  ArrowUpRight,
  ChevronRight,
  Mic,
  Plus,
  Crown,
  Sparkles,
} from "lucide-react";
import { AppShell, Card, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CollgePro Navigator" },
      { name: "description", content: "Stay on top of your tasks, monitor progress, and track status across all your academic projects." },
      { property: "og:title", content: "CollgePro Navigator" },
      { property: "og:description", content: "The smarter way for B.Tech students to manage projects and prep for vivas." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Good morning, Aarav</h1>
        <p className="mt-1 text-sm text-muted-foreground">Stay on top of your tasks, monitor progress, and track status.</p>
      </div>

      <StatRow />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <ActiveProjectsCard />
          <UpcomingThisWeekCard />
        </div>
        <div className="space-y-5">
          <QuickPrepCard />
          <RecentSessionsCard />
        </div>
      </div>

      <YourTeamsCard />
    </AppShell>
  );
}

function StatRow() {
  const stats = [
    { label: "Active Projects", value: "4", delta: "+2 this week", tone: "up" as const, icon: FolderKanban, tint: "muted" as const },
    { label: "Upcoming Vivas", value: "3", delta: "Next in 2 days", tone: "up" as const, icon: Calendar, tint: "muted" as const },
    { label: "Pending Tasks", value: "5", delta: "5 overdue", tone: "down" as const, icon: ListChecks, tint: "muted" as const },
    { label: "Practice Sessions", value: "5", delta: "+3 this week", tone: "up" as const, icon: BrainCircuit, tint: "primary" as const },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => {
        const I = s.icon;
        const primary = s.tint === "primary";
        return (
          <div
            key={s.label}
            className={`rounded-2xl p-5 shadow-[var(--shadow-card)] ${
              primary ? "bg-primary-soft" : "bg-card"
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
              <I className={`h-4 w-4 ${primary ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-foreground">{s.value}</div>
            <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${s.tone === "up" ? "text-success" : "text-warning"}`}>
              <ArrowUpRight className={`h-3 w-3 ${s.tone === "down" ? "rotate-180" : ""}`} /> {s.delta}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const PROJECTS = [
  { tag: "PBL", title: "Smart Traffic Management System", progress: 33, due: "Due in 16 days", members: 3 },
  { tag: "MAJOR", title: "AI Health Diagnostic Tool", progress: 40, due: "Due in 62 days", members: 2 },
  { tag: "PBL", title: "E-Commerce Platform", progress: 0, due: "Due in 73 days", members: 2 },
  { tag: "MAJOR", title: "IoT Smart Home Automation", progress: 50, due: "Due in 2 days", members: 2 },
];

function ActiveProjectsCard() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Your Active Projects</h3>
        <Link to="/projects" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-primary">
            <Badge tone={p.tag === "MAJOR" ? "primary" : "muted"}>{p.tag}</Badge>
            <div className="mt-3 truncate font-semibold">{p.title}</div>
            <div className="mt-2 flex -space-x-2">
              {Array.from({ length: p.members }).map((_, i) => (
                <div key={i} className="grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-secondary text-[9px] font-semibold">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{p.progress}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-success">
              <Calendar className="h-3 w-3" /> {p.due}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function UpcomingThisWeekCard() {
  const items = [
    { date: "06", mo: "JUL", title: "PBL Mid Evaluation", sub: "Smart Traffic System", tone: "success" as const },
    { date: "01", mo: "JUL", title: "IoT Project Review", sub: "Smart Home Automation", tone: "destructive" as const },
    { date: "10", mo: "JUL", title: "CNN Model Deadline", sub: "AI Health Diagnostic", tone: "success" as const },
    { date: "15", mo: "JUL", title: "PBL Final Submission", sub: "Smart Traffic System", tone: "success" as const },
  ];
  const dot = { success: "bg-success", destructive: "bg-destructive", warning: "bg-warning" } as const;
  return (
    <Card>
      <h3 className="text-base font-semibold">Upcoming This Week</h3>
      <div className="mt-4 divide-y divide-border">
        {items.map((e) => (
          <div key={e.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-center">
              <div>
                <div className="text-sm font-bold leading-none text-accent-foreground">{e.date}</div>
                <div className="text-[9px] font-semibold uppercase tracking-wider text-accent-foreground/80">{e.mo}</div>
              </div>
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{e.title}</div>
              <div className="mt-0.5 truncate text-xs text-muted-foreground">{e.sub}</div>
            </div>
            <span className={`h-2 w-2 rounded-full ${dot[e.tone]}`} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function QuickPrepCard() {
  return (
    <Card>
      <h3 className="text-base font-semibold">Quick Prep</h3>
      <div className="mt-4 space-y-3">
        <Link
          to="/ai-viva/new"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
        >
          <Mic className="h-4 w-4" /> Start a Mock Viva
        </Link>
        <Link
          to="/ai-presentation"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          <MonitorSmartphone className="h-4 w-4" /> Practice Presentation
        </Link>
        <Link
          to="/ai"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-accent-foreground"
        >
          <Sparkles className="h-4 w-4" /> Explore all AI tools
        </Link>
      </div>
    </Card>
  );
}

function RecentSessionsCard() {
  const sessions = [
    { title: "Subject Viva — DBMS", date: "Jun 25", score: 85, tone: "success" as const },
    { title: "Subject Viva — Computer Networks", date: "Jun 22", score: 72, tone: "warning" as const },
    { title: "Project Viva — Smart Traffic Mana…", date: "Jun 20", score: 78, tone: "warning" as const },
    { title: "General Interview", date: "Jun 18", score: 90, tone: "success" as const },
    { title: "Subject Viva — Operating Systems", date: "Jun 15", score: 65, tone: "warning" as const },
  ];
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Recent Sessions</h3>
        <Link to="/ai-viva" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-4 space-y-3">
        {sessions.map((s) => (
          <div key={s.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-accent-foreground">
              <BrainCircuit className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{s.title}</div>
              <div className="text-[11px] text-muted-foreground">{s.date}</div>
            </div>
            <Badge tone={s.tone}>{s.score}%</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

function YourTeamsCard() {
  const teams = [
    { name: "CodeCrafters", project: "Smart Traffic Management System", members: 3, lead: true },
    { name: "TechTitans", project: "AI Health Diagnostic Tool", members: 2, lead: false },
    { name: "ByteBuilders", project: "Library Management System", members: 2, lead: true },
  ];
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Your Teams</h3>
        <Link to="/teams" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((t) => (
          <div key={t.name} className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{t.name}</div>
              {t.lead && <Badge tone="warning"><Crown className="h-3 w-3" /> Lead</Badge>}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Working on: {t.project}</div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {Array.from({ length: t.members }).map((_, i) => (
                  <div key={i} className="grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-secondary text-[9px] font-semibold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground">{t.members} members</span>
            </div>
          </div>
        ))}
        <Link
          to="/teams"
          className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="h-5 w-5" />
          <span className="text-sm font-medium">Create New Team</span>
        </Link>
      </div>
    </Card>
  );
}