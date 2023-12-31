export interface SessionRecord {
  id: number;
  sessionId: number;
  studentId: number;
  hostId: number;
  score: number;
  hostNotes?: string;
  wasPresent: boolean;
  pairId: number;
  action: "ANSWER" | "ASK";
  question?: string;
}

export interface SessionRecordsByStudentAndSessionParams {
  sessionId: number;
  studentId: number;
}

export type CreateSessionRecordDto = Omit<SessionRecord, "id">;

export interface UpdateSessionRecordDto extends SessionRecord {}

export const SESSION_RECS_FETCH_BY_STUDENT_ERROR = (id: number) =>
  `Failed to fetch session records for student with id [${id}]`;

export const SESSION_RECS_FETCH_BY_SESSION_ERROR = (id: number) =>
  `Failed to fetch session records for session with id [${id}]`;
export const SESSION_RECS_FETCH_BY_SESSION_AND_STUDENT_ERROR = (
  studentId: number,
  sessionId: number
) =>
  `Failed to fetch session records for student with id [${studentId}] and for session with id [${sessionId}]`;
