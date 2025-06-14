import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "~/app/app.css";
import { cn } from "./shared/lib/utils";
import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="h-screen w-screen">
      <div className={cn("flex size-full flex-col items-center justify-center gap-4")}>
        <div className="border-b-primary size-12 animate-spin rounded-full border-4 border-white" />
        <div className="text-foreground text-sm">로딩중...</div>
      </div>
    </div>
  );
}
