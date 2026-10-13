"use client";

import { ArrowRight, Clock3 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

export function ComingSoonPage({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  const { notify } = useToast();

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        primaryAction={{
          label: "Request access",
          icon: <ArrowRight className="h-4 w-4" aria-hidden />,
          onClick: () => notify(`${title} access request recorded`, "info")
        }}
      />
      <div className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
        <Card className="max-w-2xl p-6">
          <div className="flex gap-4">
            <div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-app-blueSoft text-app-primary">
              <Clock3 className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2 className="text-base font-semibold text-app-text">Coming soon</h2>
              <p className="mt-2 text-sm leading-6 text-app-secondary">
                This workspace is prepared for the next release. Core navigation, permissions and feedback are already in place.
              </p>
              <Button className="mt-5" onClick={() => notify("Product team notified", "info")}>
                Notify product team
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
