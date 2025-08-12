export default function UmamiAnalyticsScript() {
  const umamiId = import.meta.env.VITE_UMAMI_ID ?? "";

  if (!import.meta.env.PROD) {
    return null;
  }

  if (!umamiId || umamiId === "") {
    return null;
  }

  return (
    <script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id={import.meta.env.VITE_UMAMI_ID}
    ></script>
  );
}
