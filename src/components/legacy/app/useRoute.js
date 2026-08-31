import { useEffect, useState } from "react";
import { routeFromPath } from "./routes.js";

export function useRoute() {
  const [route, setRoute] = useState(() => routeFromPath(window.location.pathname));

  useEffect(() => {
    function syncRoute() {
      setRoute(routeFromPath(window.location.pathname));
    }

    window.addEventListener("popstate", syncRoute);
    window.addEventListener("routechange", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("routechange", syncRoute);
    };
  }, []);

  return route;
}
