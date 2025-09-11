import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Toaster position="top-center" />
      <App />
    </ReactQueryProvider>
  </StrictMode>
);
