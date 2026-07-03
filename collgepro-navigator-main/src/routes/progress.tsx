import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Plus } from "lucide-react";
import { AppShell, Card, PageHeader, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress & Tasks — CollgePro Navigator" },
      { name: "description", content: "All your tasks across projects in one focused view." },
    ],
  }),
  component: Progress,
});

const tasks = [
  { id: "T-101", title: "Train face detection model", project: "Smart Attend", due: "29 Jun", status: "In Progress", priority: "high" as const },
  { id: "T-100", title: "Build mobile login screen", project: "VisionAid", due: "30 Jun", status: "In Progress", priority: "med" as const },
  { id: "T-099", title: "Setup Firebase project", project: "Smart Attend", due: "27 Jun", status: "To Do", priority: "high" as const },
  { id: "T-098", title: "Write project synopsis", project: "QuizGen", due: "28 Jun", status: "To Do", priority: "med" as const },
  { id: "T-097", title: "Literature review notes", project: "VisionAid", due: "25 Jun", status: "Done", priority: "low" as const },
  { id: "T-096", title: "Team kickoff meeting", project: "EcoTrack", due: "24 Jun", status: "Done", priority: "low" as const },
];

function Progress() {
  return (
    <AppShell>
      <PageHeader
        title="Progress & Tasks"
        subtitle="A unified view of everything on your plate."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> Add Task
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { l: "Completed", v: "42", t: "+8 this week", tone: "success" },
          { l: "Pending", v: "07", t: "3 due soon", tone: "warning" },
          { l: "Overdue", v: "01", t: "Action needed", tone: "destructive" },
          { l: "Completion", v: "86%", t: "Above avg", tone: "primary" },
        ].map((s) => (
          <Card key={s.l}>
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="mt-2 text-3xl font-bold tracking-tight">{s.v}</div>
            <Badge
              tone={s.tone as "success" | "warning" | "destructive" | "primary"}
            >
              {s.t}
            </Badge>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
            {["All", "Mine", "This Week", "Overdue"].map((t, i) => (
              <button key={t} className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${i === 0 ? "bg-foreground text-background" : "text-muted-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search tasks" className="w-32 bg-transparent focus:outline-none" />
            </div>
            <button className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                <th className="py-2 pr-3 font-medium">ID</th>
                <th className="py-2 pr-3 font-medium">Task</th>
                <th className="py-2 pr-3 font-medium">Project</th>
                <th className="py-2 pr-3 font-medium">Status</th>
                <th className="py-2 pr-3 font-medium">Priority</th>
                <th className="py-2 pr-3 font-medium">Due</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="py-3.5 pr-3 text-xs font-medium text-muted-foreground">{t.id}</td>
                  <td className="py-3.5 pr-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked={t.status === "Done"} className="h-4 w-4 rounded border-border" />
                      <span className={t.status === "Done" ? "text-muted-foreground line-through" : "font-medium"}>{t.title}</span>
                    </label>
                  </td>
                  <td className="py-3.5 pr-3 text-muted-foreground">{t.project}</td>
                  <td className="py-3.5 pr-3">
                    <Badge tone={t.status === "Done" ? "success" : t.status === "In Progress" ? "primary" : "muted"}>{t.status}</Badge>
                  </td>
                  <td className="py-3.5 pr-3">
                    <Badge tone={t.priority === "high" ? "destructive" : t.priority === "med" ? "warning" : "muted"}>{t.priority}</Badge>
                  </td>
                  <td className="py-3.5 pr-3 text-xs text-muted-foreground">{t.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}