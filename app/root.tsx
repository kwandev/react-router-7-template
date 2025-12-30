import React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "~/app/styles/app.css";
import type { Route } from "./+types/root";
import {
  Ga4AnalyticsScript,
  UmamiAnalyticsScript,
  VercelAnalyticsScript,
} from "./shared/lib/analytics";
import { cn } from "./shared/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 
          favicon (https://dev-huiya.github.io/favicon-generator/) 
        */}
        {/* <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon-180.png" />
        <link rel="manifest" href="/manifest.webmanifest" /> */}

        {/* sitemap, robots */}
        {/* <link rel="sitemap" href="/sitemap.xml" /> */}
        {/* <link rel="robots" href="/robots.txt" /> */}

        {/* google site verification (구글 서치콘솔) */}
        {/* <meta
          name="google-site-verification"
          content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION}
        /> */}

        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />

        {/* google analytics */}
        <Ga4AnalyticsScript />
        {/* umami analytics */}
        <UmamiAnalyticsScript />
        {/* Vercel analytics */}
        <VercelAnalyticsScript />
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <main className="container mx-auto p-4 pt-16">
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 pb-10">
          <p className="text-center text-6xl">🚧</p>
          <h1 className="text-2xl font-bold">{error.status}</h1>
          <p className="text-grey-700 text-base">{error.statusText}</p>
          <div className="whitespace-pre-wrap">{error.data}</div>
        </div>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main className="container mx-auto p-4 pt-16">
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 pb-10">
          <p className="text-center text-6xl">⚠️</p>
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-grey-700 text-base">{error.message}</p>
          <div className="whitespace-pre-wrap">{error.stack}</div>
        </div>
      </main>
    );
  } else {
    return (
      <main className="container mx-auto p-4 pt-16">
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 pb-10">
          <p className="text-center text-6xl">😥</p>
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-grey-700 text-base">알 수 없는 에러가 발생했어요</p>
        </div>
      </main>
    );
  }
}
