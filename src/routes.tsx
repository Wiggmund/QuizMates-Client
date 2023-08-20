import { createBrowserRouter } from "react-router-dom";
import { HomePage, SessionPage, SessionsPage, StudentPage } from "./pages";

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
    path: "/sessions/:sessionId",
    element: <SessionPage />,
  },
  {
    path: "/students/:studentId",
    element: <StudentPage />,
  },
]);
