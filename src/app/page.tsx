import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg px-6 text-center">
      <div>
        <meta httpEquiv="refresh" content="0; url=/overview" />
        <h1 className="text-xl font-semibold text-app-text">Opening Northframe</h1>
        <p className="mt-2 text-sm text-app-secondary">
          If the app does not open automatically, go to{" "}
          <Link className="font-semibold text-app-primary" href="/overview">
            Overview
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
