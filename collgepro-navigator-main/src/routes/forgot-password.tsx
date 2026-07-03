import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — CollgePro Navigator" }] }),
  component: ForgotPassword,
});

function ForgotPassword() {
  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-[var(--shadow-card)]">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <GraduationCap className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">Reset your password</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>
        <form className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="you@college.edu.in"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
            Send Reset Link
          </button>
        </form>
        <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
      </div>
    </div>
  );
}