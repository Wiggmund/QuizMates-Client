import { createBrowserRouter } from "react-router-dom";
import {
  GroupPage,
  HomePage,
  HostPage,
  QuizPage,
  SessionPage,
  SessionRecordsPage,
  SessionsPage,
  StudentPage,
} from "./pages";
import QuizGame from "./pages/QuizGame/QuizGame";

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
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/quizgame",
    element: <QuizGame />,
  },
]);
