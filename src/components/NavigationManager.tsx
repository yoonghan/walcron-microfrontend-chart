import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavigationListener } from "@yoonghan/walcron-microfrontend-shared";

interface NavigationManagerProps {
  children: ReactElement;
}

export function NavigationManager({ children }: NavigationManagerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useNavigationListener({
    appName: "app1",
    containerName: "shell",
    props: {
      pathname: location.pathname,
      navigate,
    },
  });

  return children;
}
