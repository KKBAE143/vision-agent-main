import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mic, BookOpen, FolderKanban, BrainCircuit } from "lucide-react";
import { AppShell, Card, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/ai-viva/new")({
  head: () => ({ meta: [{ title: "Configure Mock Viva — CollgePro Navigator" }] }),
  component: NewViva,
});

function NewViva() {
  return (
    <AppShell>
      <div className="flex items-center gap-3">
        <Link to="/ai-viva" className="grid h-9 w-9 place-items-center rounded-xl bg-card shadow-[var(--shadow-card)]">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader title="New Mock Viva" subtitle="Configure your session and start practicing." />
      </div>
      <Card>
        <Section title="Session Type">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { t: "Subject Viva", d: "For a specific exam", i: BookOpen },
              { t: "Project Viva", d: "Defend your project", i: FolderKanban, active: true },
              { t: "General", d: "Technical interview", i: BrainCircuit },
            ].map((o) => {
              const I = o.i;
              return (
                <button key={o.t} className={`rounded-xl border p-4 text-left transition-colors ${o.active ? "border-primary bg-primary-soft" : "border-border hover:border-primary"}`}>
                  <I className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-semibold">{o.t}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{o.d}</div>
                </button>
              );
            })}
          </div>
        </Section>
        <Section title="Duration">
          <div className="flex flex-wrap gap-2">
            {["Quick · 5 min", "Short · 10 min", "Medium · 20 min", "Deep · 30 min"].map((d, i) => (
              <button key={d} className={`rounded-xl border px-4 py-2.5 text-sm font-medium ${i === 2 ? "border-primary bg-primary-soft" : "border-border"}`}>
                {d}
              </button>
            ))}
          </div>
        </Section>
        <Section title="Difficulty">
          <div className="flex flex-wrap gap-2">
            {["Easy", "Medium", "Hard", "Adaptive"].map((d, i) => (
              <button key={d} className={`rounded-full px-4 py-1.5 text-sm font-medium ${i === 3 ? "bg-foreground text-background" : "bg-secondary"}`}>
                {d}
              </button>
            ))}
          </div>
        </Section>
        <Section title="Project">
          <select className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm">
            <option>Smart Attendance System</option>
            <option>VisionAid</option>
            <option>QuizGen</option>
          </select>
        </Section>
        <Section title="Focus Areas">
          <div className="flex flex-wrap gap-2">
            {["Algorithms", "Database", "Networking", "OOP", "Machine Learning"].map((t, i) => (
              <span key={t} className={`rounded-full px-3 py-1 text-xs font-medium ${i < 3 ? "bg-primary-soft text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
                {t} {i < 3 && "×"}
              </span>
            ))}
          </div>
        </Section>
        <Section title="Language">
          <div className="flex gap-2">
            {["English", "Hindi", "Hinglish"].map((l, i) => (
              <button key={l} className={`rounded-full px-4 py-1.5 text-sm font-medium ${i === 0 ? "bg-foreground text-background" : "bg-secondary"}`}>
                {l}
              </button>
            ))}
          </div>
        </Section>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Link to="/ai-viva" className="rounded-xl bg-secondary px-4 py-3 text-sm font-medium">Cancel</Link>
          <Link to="/ai-viva/session/$id" params={{ id: "new" }} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            <Mic className="h-4 w-4" /> Begin Mock Viva
          </Link>
        </div>
      </Card>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}