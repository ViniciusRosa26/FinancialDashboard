import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Inicializa a aplicação React no elemento raiz gerado pelo Vite.
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
