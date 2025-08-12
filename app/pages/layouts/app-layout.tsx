import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="flex h-full flex-col">
      <Outlet />
    </div>
  );
}
