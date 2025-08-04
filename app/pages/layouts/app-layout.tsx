import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <Outlet />
    </div>
  );
}
