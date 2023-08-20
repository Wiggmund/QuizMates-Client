import { createBrowserRouter } from "react-router-dom";
import {
  GroupPage,
  HomePage,
  HostPage,
  SessionPage,
  SessionsPage,
  StudentPage,
} from "./pages";

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
  {
    path: "/groups/:groupId",
    element: <GroupPage />,
  },
  {
    path: "/hosts/:hostId",
    element: <HostPage />,
  },
]);
