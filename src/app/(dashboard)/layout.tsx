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
        <header className="flex h-14 items-center border-b border-border px-6">
          <p className="text-sm text-muted-foreground">
            Workspace overview
          </p>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
