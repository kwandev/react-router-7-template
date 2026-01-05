import { cn } from "~/shared/lib/utils";

export default function CommonFallback() {
  return (
    <div className={cn("flex size-full flex-col items-center justify-center gap-4")}>
      <div className="border-b-primary size-12 animate-spin rounded-full border-4 border-white" />
      <div className="text-foreground text-sm">Loading...</div>
    </div>
  );
}
