import { useEffect, useState } from "react";
import ExpensePage from "./pages/ExpensePage";
import HomePage from "./pages/HomePage";
import HeritagePage from "./pages/HeritagePage";
import IncomePage from "./pages/IncomePage";
import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";

const routes = {
    "/": HomePage,
    "/expenses": ExpensePage,
    "/users": UsersPage,
    "/heritages": HeritagePage,
    "/incomes": IncomePage,
    "/overviews": OverviewPage
};

function App() {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => {
            setPathname(window.location.pathname);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const navigate = (path) => {
        window.history.pushState({}, "", path);
        setPathname(path);
    };

    const CurrentPage = routes[pathname] ?? HomePage;

    return <CurrentPage navigate={navigate} />;
}

export default App;
