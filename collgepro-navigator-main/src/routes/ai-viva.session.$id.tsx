import { createFileRoute, Link } from "@tanstack/react-router";
import { Mic, X, SkipForward, RotateCcw, Volume2 } from "lucide-react";

export const Route = createFileRoute("/ai-viva/session/$id")({
  head: () => ({ meta: [{ title: "Live Viva Session — CollgePro Navigator" }] }),
  component: VivaSession,
});

const history = [
  { q: "Explain ACID properties.", tone: "success" as const },
  { q: "What is denormalization?", tone: "success" as const },
  { q: "Difference between INNER and LEFT JOIN?", tone: "warning" as const },
];

function VivaSession() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/ai-viva" aria-label="End" className="grid h-9 w-9 place-items-center rounded-xl bg-secondary">
              <X className="h-4 w-4" />
            </Link>
            <div>
              <div className="text-sm font-semibold">Project Viva · Smart Attend</div>
              <div className="text-xs text-muted-foreground">Medium difficulty · Hinglish</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <div className="text-xs text-muted-foreground">Question</div>
              <div className="text-sm font-semibold">04 / 15</div>
            </div>
            <div className="rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold tabular-nums">12:34</div>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <main className="space-y-6">
          <div className="flex justify-center">
            <div className="relative grid h-32 w-32 place-items-center rounded-full bg-primary text-primary-foreground">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-20" />
              <Volume2 className="h-10 w-10" />
            </div>
          </div>
          <div className="rounded-2xl bg-card p-8 text-center shadow-[var(--shadow-card)]">
            <div className="flex justify-center gap-2">
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-accent-foreground">Conceptual</span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">Medium</span>
            </div>
            <h2 className="mt-5 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
              How does your face recognition model handle low-light classroom conditions?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Take your time. Speak naturally or type below.</p>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex flex-col items-center gap-4">
              <button className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95">
                <Mic className="h-7 w-7" />
              </button>
              <div className="flex items-end gap-1">
                {[20, 40, 30, 60, 80, 50, 30, 70, 45, 25].map((h, i) => (
                  <div key={i} className="w-1.5 rounded-full bg-primary" style={{ height: `${h}%`, maxHeight: 40 }} />
                ))}
              </div>
              <div className="text-xs text-muted-foreground">Tap to record · or type below</div>
              <textarea
                rows={3}
                placeholder="Or type your answer here..."
                className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <button className="text-sm text-muted-foreground hover:text-foreground">I don't know</button>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium">
                    <RotateCcw className="h-4 w-4" /> Retry
                  </button>
                  <button className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background">
                    <SkipForward className="h-4 w-4" /> Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="text-sm font-semibold">Question History</h3>
          <div className="mt-4 space-y-3">
            {history.map((h, i) => (
              <div key={i} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider">
                  <span className="text-muted-foreground">Q{i + 1}</span>
                  <span className={h.tone === "success" ? "text-success" : "text-warning"}>
                    {h.tone === "success" ? "Good" : "Okay"}
                  </span>
                </div>
                <div className="mt-1.5 text-xs">{h.q}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}