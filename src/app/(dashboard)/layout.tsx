import { AppSidebar } from "@/components/layout/app-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center border-b border-wf-border bg-wf-surface/80 px-6 backdrop-blur-md">
          <p className="text-[13px] font-medium text-wf-text-2">
            Workspace overview
          </p>
        </header>
        <main className="flex-1 bg-wf-bg p-6">{children}</main>
      </div>
    </div>
  );
}
