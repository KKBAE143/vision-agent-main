import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, LogOut, Bell, Lock, Globe, Sparkles } from "lucide-react";
import { AppShell, Card, PageHeader, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — CollgePro Navigator" },
      { name: "description", content: "Manage your profile, account, and preferences." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <AppShell>
      <PageHeader title="Profile & Settings" subtitle="Manage your account, preferences, and notifications." />
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="grid h-24 w-24 place-items-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                AR
              </div>
              <button className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl bg-card text-foreground shadow-[var(--shadow-card)]">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 text-lg font-bold">Aarav Reddy</div>
            <div className="text-xs text-muted-foreground">aarav.r@iiitb.ac.in</div>
            <Badge tone="primary">3rd Year · CSE</Badge>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            {[
              { l: "Profile", i: Sparkles, active: true },
              { l: "Account", i: Lock },
              { l: "Notifications", i: Bell },
              { l: "Preferences", i: Globe },
            ].map((t) => {
              const I = t.i;
              return (
                <button
                  key={t.l}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                    t.active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <I className="h-4 w-4" /> {t.l}
                </button>
              );
            })}
            <Link to="/login" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" /> Sign Out
            </Link>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <p className="mt-1 text-sm text-muted-foreground">Update your personal details and academic info.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" defaultValue="Aarav Reddy" />
            <Field label="Email" defaultValue="aarav.r@iiitb.ac.in" disabled />
            <Field label="College Name" defaultValue="IIIT Bangalore" />
            <Field label="Branch" defaultValue="Computer Science" />
            <Field label="Year of Study" defaultValue="3rd Year" />
            <Field label="Roll Number" defaultValue="IMT2023045" />
          </div>
          <div className="mt-5">
            <span className="mb-1.5 block text-sm font-medium">Bio</span>
            <textarea
              rows={3}
              defaultValue="ML enthusiast, working on computer vision projects. Always up to collaborate."
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button className="rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium">Cancel</button>
            <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Save Changes</button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Field({ label, defaultValue, disabled }: { label: string; defaultValue: string; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm disabled:bg-secondary disabled:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}