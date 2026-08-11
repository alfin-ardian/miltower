import { Outlet } from "react-router-dom";

export function GameLayout() {
  return (
    <div className="min-h-svh bg-cream">
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
}
