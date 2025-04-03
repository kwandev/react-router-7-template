import { getList } from "~/entities/sample.api";
import type { Route } from "./+types/home";
import type { Todo } from "~/entities/sample.types";

export async function loader() {
  const data = await getList();
  return { data };
}

export function meta() {
  return [
    {
      title: "React Router 7 Boilerplate",
      description: "React Router 7 Boilerplate",
    },
  ];
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <main className="mx-auto w-full max-w-screen-md flex-1 px-4">
        <header className="py-5">
          <h1 className="text-2xl font-bold">React Router 7</h1>
        </header>

        <div className="mt-10">
          <ul>
            {loaderData.data.map((item: Todo) => (
              <li key={item.id}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-medium">{item.title}</h2>
                  <span className="text-sm text-gray-500">{item.userId}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
