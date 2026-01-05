import React from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "~/app/styles/app.css";
import type { Route } from "./+types/root";
import CommonErrorBoundary from "./shared/components/common/error/common-error-boundary";
import CommonFallback from "./shared/components/common/error/common-fallback";
import {
  Ga4AnalyticsScript,
  UmamiAnalyticsScript,
  VercelAnalyticsScript,
} from "./shared/lib/analytics";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
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
      <body>
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
      <CommonFallback />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <CommonErrorBoundary error={error} />;
}
