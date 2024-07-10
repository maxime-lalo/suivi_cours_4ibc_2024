import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModuleConfig from "./config/ModuleConfig";
import HomePage from "./components/pages/HomePage";

const pages = ModuleConfig.getInstance().getConfig().modules.pages;

const router = createBrowserRouter([
  {
    path: pages.Home.props.path,
    element: <HomePage />,
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}
