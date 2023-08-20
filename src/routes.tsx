import { createBrowserRouter } from "react-router-dom";
import { HomePage, SessionsPage } from "./pages";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sessions",
    element: <SessionsPage />,
  },
  {
    path: "/students/:studentId",
    element: <div>Student page</div>,
  },
]);
