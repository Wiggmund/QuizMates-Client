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
