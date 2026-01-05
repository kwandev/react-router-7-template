import { isRouteErrorResponse } from "react-router";

export default function CommonErrorBoundary({ error }: { error: unknown }) {
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
