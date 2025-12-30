export { Ga4AnalyticsScript } from "./ga4-script";
export { UmamiAnalyticsScript } from "./umami-script";
export { VercelAnalyticsScript } from "./vercel-script";

declare global {
  interface Window {
    gtag: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export function trackEvent<T extends string>(eventName: T, properties?: Record<string, unknown>) {
  const isProd = import.meta.env.PROD;
  if (window.gtag) {
    window.gtag("event", eventName, {
      ...properties,
      debug_mode: !isProd,
    });
  }
}
