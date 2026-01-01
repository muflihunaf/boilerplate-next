export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
        <span className="text-sm text-muted">Loading...</span>
      </div>
    </div>
  );
}

