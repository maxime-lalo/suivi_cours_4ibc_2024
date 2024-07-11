import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModuleConfig from "./config/ModuleConfig";
import HomePage from "./components/pages/HomePage";
import ModulePage from "./components/materials/ModulePage";
import TestPage from "./components/pages/TestPage";
import UsersPage from "./components/pages/UsersPage";

const pages = ModuleConfig.getInstance().getConfig().modules.pages;

const router = createBrowserRouter([
  {
    path: pages.Home.props.path,
    element: (
      <ModulePage from={pages.Home}>
        <HomePage />
      </ModulePage>
    ),
  },
  {
    path: pages.Test.props.path,
    element: (
      <ModulePage from={pages.Test}>
        <TestPage />
      </ModulePage>
    ),
  },
  {
    path: pages.Users.props.path,
    element: (
      <ModulePage from={pages.Users}>
        <UsersPage />
      </ModulePage>
    ),
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}
