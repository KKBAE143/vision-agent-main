import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, Filter, MoreHorizontal, FolderKanban } from "lucide-react";
import { AppShell, Card, PageHeader, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "My Projects — CollgePro Navigator" },
      { name: "description", content: "Manage your PBL, Major and Mini projects in one place." },
    ],
  }),
  component: Projects,
});

const PROJECTS = [
  { id: "p1", title: "Smart Attendance System", type: "PBL", subject: "Computer Networks", progress: 72, status: "In Progress", deadline: "12 Jul 2026", team: 4 },
  { id: "p2", title: "VisionAid — AI for Visually Impaired", type: "Major", subject: "Machine Learning", progress: 48, status: "In Progress", deadline: "30 Sep 2026", team: 5 },
  { id: "p3", title: "QuizGen — AI Quiz Generator", type: "Mini", subject: "DBMS", progress: 90, status: "Under Review", deadline: "10 Jul 2026", team: 3 },
  { id: "p4", title: "EcoTrack — Carbon Footprint App", type: "PBL", subject: "Software Engineering", progress: 25, status: "In Progress", deadline: "22 Aug 2026", team: 4 },
  { id: "p5", title: "RoutePilot — Smart Maps", type: "Mini", subject: "Algorithms", progress: 100, status: "Completed", deadline: "10 Jun 2026", team: 2 },
] as const;

function Projects() {
  return (
    <AppShell>
      <PageHeader
        title="My Projects"
        subtitle="Manage your PBL, Major, and Mini projects."
        action={
          <Link to="/projects/new" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95">
            <Plus className="h-4 w-4" /> New Project
          </Link>
        }
      />
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
            {["All", "PBL", "Major", "Mini", "Completed"].map((t, i) => (
              <button
                key={t}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  i === 0 ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search projects" className="w-40 bg-transparent focus:outline-none" />
            </div>
            <button className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Project</th>
                <th className="py-2 pr-3 font-medium">Type</th>
                <th className="py-2 pr-3 font-medium">Progress</th>
                <th className="py-2 pr-3 font-medium">Status</th>
                <th className="py-2 pr-3 font-medium">Deadline</th>
                <th className="py-2 pr-3 font-medium">Team</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="py-3.5 pr-3">
                    <Link to="/projects/$id" params={{ id: p.id }} className="block">
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-xs text-muted-foreground">{p.subject}</div>
                    </Link>
                  </td>
                  <td className="py-3.5 pr-3">
                    <Badge tone={p.type === "Major" ? "primary" : p.type === "Mini" ? "muted" : "warning"}>{p.type}</Badge>
                  </td>
                  <td className="py-3.5 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full rounded-full ${p.progress === 100 ? "bg-success" : "bg-primary"}`}
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-3">
                    <Badge tone={p.status === "Completed" ? "success" : p.status === "Under Review" ? "warning" : "primary"}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {p.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 pr-3 text-xs text-muted-foreground">{p.deadline}</td>
                  <td className="py-3.5 pr-3">
                    <div className="flex -space-x-2">
                      {Array.from({ length: p.team }).slice(0, 3).map((_, i) => (
                        <div key={i} className="grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-secondary text-[10px] font-semibold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      {p.team > 3 && (
                        <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-foreground text-[10px] font-semibold text-background">
                          +{p.team - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    <button aria-label="More" className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="border border-dashed border-border bg-transparent shadow-none">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary">
            <FolderKanban className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="mt-3 text-base font-semibold">Start something new</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Spin up a new PBL, Major, or Mini project with templates, milestones and AI-ready viva prep.
          </p>
          <Link to="/projects/new" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background">
            <Plus className="h-4 w-4" /> Create Project
          </Link>
        </div>
      </Card>
    </AppShell>
  );
}