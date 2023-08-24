import { Group } from "./Group";
import { Host } from "./Host";
import { Session } from "./Session";
import { CreateSessionRecordDto, SessionRecord } from "./SessionRecord";
import { Student } from "./Student";

export interface Quiz {
  id: string;
  session?: Session;
  records: CreateSessionRecordDto[];
  groups: Group[];
  hosts: Host[];
  absentStudents: Student[];
  presentStudents: Student[];
  status: QuizStatus;
}

export type QuizStatus = "active" | "finished";
