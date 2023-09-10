export const SessionStatus: {
  FINISHED: any;
  STARTED: any;
  CREATED: any;
} = {
  FINISHED: "FINISHED",
  STARTED: "STARTED",
  CREATED: "CREATED",
};

export interface Session {
  id: number;
  title: string;
  description: string;
  host: number;
  date: Date;
  bestStudent?: number;
  bestGroup?: number;
  status: keyof typeof SessionStatus;
}

export type CreateSessionDto = Omit<
  Session,
  "id" | "bestStudent" | "bestGroup"
>;

export interface SessionStudentScoreParams {
  sessionId: number;
  studentId: number;
}
export interface SessionGroupScoreParams {
  sessionId: number;
  groupId: number;
}

export interface UpdateSessionDto extends Session {}

export const SESSION_NOT_FOUND_BY_ID = (id: number) =>
  `Session with id [${id}] not found`;

export const ALL_SESSION_FETCH_ERROR = () => `Failed to fetch all sessions`;
export const SESSION_PRESENT_STUDENTS_ERROR = (sessionId: number) =>
  `Failed to fetch present students for session with id [${sessionId}]`;
export const SESSION_GROUP_SCORE_ERROR = (sessionId: number, groupId: number) =>
  `Failed to fetch group score for session with id [${sessionId}] and group with id [${groupId}]`;
export const SESSION_STUDENT_SCORE_ERROR = (
  sessionId: number,
  studentId: number
) =>
  `Failed to fetch student score for session with id [${sessionId}] and student with id [${studentId}]`;
