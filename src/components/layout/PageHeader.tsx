import { Button } from "@/components/ui/Button";

export function PageHeader({
  title,
  description,
  controls,
  primaryAction
}: {
  title: string;
  description: string;
  controls?: React.ReactNode;
  primaryAction?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-app-separator bg-app-bg px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <h1 className="text-[23px] font-bold leading-8 tracking-[-0.01em] text-app-text sm:text-[28px] sm:leading-[34px]">{title}</h1>
          <p className="mt-1 text-sm text-app-secondary">{description}</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-end">
          {controls}
          {primaryAction ? (
            <Button className="w-full sm:w-auto" variant="primary" onClick={primaryAction.onClick}>
              {primaryAction.icon}
              {primaryAction.label}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
