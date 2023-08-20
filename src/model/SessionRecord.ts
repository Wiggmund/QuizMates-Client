export interface SessionRecord {
  id: number;
  sessionId: number;
  studentId: number;
  hostId: number;
  score: number;
  hostNotes?: string;
  wasPresent: boolean;
  opponentId: number;
  action: "answer" | "ask";
  question?: string;
}

// private Long id;
// private Long sessionId;
// private Long pairId;
// private Long studentId;
// private Long hostId;
// private Double score;
// private String hostNotes;
// private Boolean wasPresent;
