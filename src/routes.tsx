import { createBrowserRouter } from "react-router-dom";
import {
  CreateSessionPage,
  GroupPage,
  HomePage,
  HostPage,
  QuizConfigurationPage,
  QuizGamePage,
  SessionPage,
  SessionRecordsPage,
  SessionsPage,
  StudentPage,
} from "./pages";
import App from "./App";

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
  {
    path: "/sessionRecords",
    element: <SessionRecordsPage />,
  },
  {
    path: "/sessions/create",
    element: <CreateSessionPage />,
  },
  {
    path: "/sessions/configure",
    element: <QuizConfigurationPage />,
  },
  {
    path: "/sessions/quiz",
    element: <QuizGamePage />,
  },
  {
    path: "/test",
    element: <App />,
  },
]);
