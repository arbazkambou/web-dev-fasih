import { Outlet } from "react-router";
import CartOverview from "../features/cart/CartOverview";

function AppLayout() {
  return (
    <div>
      <header>
        <h1>Fast React Pizza.</h1>
        <p>Arbaz</p>
      </header>

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
