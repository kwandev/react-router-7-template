import { Analytics } from "@vercel/analytics/react";

export default function VercelAnalyticsScript() {
  return <Analytics debug={!import.meta.env.PROD} />;
}
