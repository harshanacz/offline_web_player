import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <main className={cn(
      "min-h-screen w-full bg-gradient-to-b from-neutral-900 to-black p-4 flex items-center justify-center",
      className
    )}>
      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
}