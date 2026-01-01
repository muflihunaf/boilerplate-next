export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground" />
        <span className="text-sm text-muted">Loading...</span>
      </div>
    </div>
  );
}
