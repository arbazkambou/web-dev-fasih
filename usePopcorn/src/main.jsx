import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RatingStar from "./components/RatingStar.jsx";
// import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RatingStar color="#FFD700" size={50} />
  </StrictMode>
);
