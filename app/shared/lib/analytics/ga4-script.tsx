export default function Ga4AnalyticsScript() {
  const googleTagId = import.meta.env.VITE_GOOGLE_TAG_ID ?? "";

  if (!googleTagId || googleTagId === "") {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_TAG_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${
                import.meta.env.PROD
                  ? `gtag('config', '${import.meta.env.VITE_GOOGLE_TAG_ID}');`
                  : `gtag('config', '${import.meta.env.VITE_GOOGLE_TAG_ID}', {
                      debug_mode: true,
                    });`
              }
              `,
        }}
      />
    </>
  );
}
