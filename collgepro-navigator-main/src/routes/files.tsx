import { createFileRoute } from "@tanstack/react-router";
import { Upload, FileText, Download, Image as ImageIcon, FileArchive, FileSpreadsheet } from "lucide-react";
import { AppShell, Card, PageHeader, Badge } from "@/components/app-shell";

export const Route = createFileRoute("/files")({
  head: () => ({
    meta: [
      { title: "Files & Resources — CollgePro Navigator" },
      { name: "description", content: "All your project documents, reports, and slides in one place." },
    ],
  }),
  component: Files,
});

const files = [
  { name: "Smart Attend — SRS.pdf", project: "Smart Attend", size: "2.4 MB", date: "20 Jun", type: "pdf" },
  { name: "VisionAid — Mid Review.pptx", project: "VisionAid", size: "8.1 MB", date: "18 Jun", type: "ppt" },
  { name: "QuizGen — DB Schema.png", project: "QuizGen", size: "320 KB", date: "15 Jun", type: "img" },
  { name: "Smart Attend — Codebase v2.zip", project: "Smart Attend", size: "14 MB", date: "12 Jun", type: "zip" },
  { name: "EcoTrack — Survey Results.xlsx", project: "EcoTrack", size: "640 KB", date: "10 Jun", type: "xls" },
];

const icons = {
  pdf: FileText, ppt: FileText, img: ImageIcon, zip: FileArchive, xls: FileSpreadsheet,
} as const;

function Files() {
  return (
    <AppShell>
      <PageHeader
        title="Files & Resources"
        subtitle="Project docs, reports, slides — everything in one place."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            <Upload className="h-4 w-4" /> Upload
          </button>
        }
      />
      <Card className="border-2 border-dashed border-border bg-transparent shadow-none">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Upload className="h-5 w-5" />
          </div>
          <div className="mt-3 text-sm font-semibold">Drag & drop files here</div>
          <div className="mt-1 text-xs text-muted-foreground">PDF, DOCX, PPTX, images, ZIP up to 50 MB</div>
        </div>
      </Card>
      <Card>
        <h3 className="text-base font-semibold">All Files</h3>
        <div className="mt-4 divide-y divide-border">
          {files.map((f) => {
            const I = icons[f.type as keyof typeof icons];
            return (
              <div key={f.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-3.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary">
                  <I className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{f.name}</div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge>{f.project}</Badge>
                    <span>{f.size}</span>
                    <span>·</span>
                    <span>{f.date}</span>
                  </div>
                </div>
                <button aria-label="Download" className="grid h-9 w-9 place-items-center rounded-xl bg-secondary hover:bg-secondary/70">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}