import { Analytics } from "@vercel/analytics/react";

export function VercelAnalyticsScript() {
  return <Analytics debug={!import.meta.env.PROD} />;
}
