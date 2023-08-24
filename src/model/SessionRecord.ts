export interface SessionRecord {
  id: number;
  sessionId: number;
  studentId: number;
  hostId: number;
  score: number;
  hostNotes?: string;
  wasPresent: boolean;
  pairId: number;
  action: "answer" | "ask";
  question?: string;
}

export type CreateSessionRecordDto = Omit<SessionRecord, "id">;

// private Long id;
// private Long sessionId;
// private Long pairId;
// private Long studentId;
// private Long hostId;
// private Double score;
// private String hostNotes;
// private Boolean wasPresent;
