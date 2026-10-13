import { Button } from "@/components/ui/Button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">
      <h3 className="text-base font-semibold text-app-text">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-app-secondary">{description}</p>
      <Button className="mt-5" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-app-border bg-white px-6 py-8 text-center shadow-soft">
      <h3 className="text-base font-semibold text-app-text">We could not load this data.</h3>
      <p className="mt-2 text-sm text-app-secondary">The request did not complete. Try again to refresh this section.</p>
      <Button className="mt-5" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
