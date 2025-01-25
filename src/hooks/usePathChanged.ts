import { useEffect, useRef, useState } from "react";
import { useLocation, Location } from "react-router-dom";

export function usePathChanged(): [boolean, (value: boolean) => void] {
  const location = useLocation();
  const previousPath = useRef<string>(location.pathname);
  const [hasPathChanged, setHasPathChanged] = useState<boolean>(false);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      setHasPathChanged(true);
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);

  return [hasPathChanged, setHasPathChanged];
}
