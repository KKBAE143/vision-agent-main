import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users, Crown } from "lucide-react";
import { AppShell, Card, PageHeader, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "My Teams — CollgePro Navigator" },
      { name: "description", content: "Manage your project teams and collaborate with classmates." },
    ],
  }),
  component: Teams,
});

const TEAMS = [
  { name: "Code Crew", project: "Smart Attendance System", members: 4, role: "Lead", last: "2h ago" },
  { name: "VisionFour", project: "VisionAid", members: 5, role: "Member", last: "Yesterday" },
  { name: "QuizMakers", project: "QuizGen", members: 3, role: "Member", last: "3d ago" },
  { name: "EcoSquad", project: "EcoTrack", members: 4, role: "Lead", last: "5d ago" },
];

function Teams() {
  return (
    <AppShell>
      <PageHeader
        title="My Teams"
        subtitle="Manage teams across your projects."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> New Team
          </button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEAMS.map((t) => (
          <Card key={t.name} className="transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary">
                <Users className="h-5 w-5" />
              </div>
              {t.role === "Lead" && <Badge tone="warning"><Crown className="h-3 w-3" /> Lead</Badge>}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.project}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {Array.from({ length: t.members }).slice(0, 4).map((_, i) => (
                  <div key={i} className="grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-secondary text-[10px] font-semibold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{t.last}</span>
            </div>
          </Card>
        ))}
        <Card className="flex min-h-[200px] flex-col items-center justify-center border-2 border-dashed border-border bg-transparent shadow-none transition-colors hover:border-primary">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <Plus className="h-5 w-5" />
          </div>
          <div className="mt-3 text-sm font-semibold">Create new team</div>
          <div className="mt-1 text-xs text-muted-foreground">Invite classmates & start</div>
        </Card>
      </div>
    </AppShell>
  );
}
