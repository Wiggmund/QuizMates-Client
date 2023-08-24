import {
  CreateSessionDto,
  CreateSessionRecordDto,
  Group,
  Host,
  Pair,
  Session,
  SessionRecord,
  SessionStatus,
  Student,
  StudentWithGroup,
} from "./model";
import { getFullName } from "./utils";

export const studentsSource: Student[] = [
  {
    id: 1,
    firstName: "Sem",
    lastName: "Vin",
    group_id: 1,
    isTeamLead: false,
  },
  {
    id: 2,
    firstName: "Dean",
    lastName: "Vin",
    group_id: 1,
    isTeamLead: false,
  },
  {
    id: 3,
    firstName: "Alex",
    lastName: "Trim",
    group_id: 1,
    isTeamLead: false,
  },
  {
    id: 4,
    firstName: "John",
    lastName: "Don",
    group_id: 2,
    isTeamLead: false,
  },
  {
    id: 5,
    firstName: "Mick",
    lastName: "Pick",
    group_id: 2,
    isTeamLead: false,
  },
  {
    id: 6,
    firstName: "Tet",
    lastName: "Ded",
    group_id: 2,
    isTeamLead: false,
  },
];

export const groupSource: Group[] = [
  {
    id: 1,
    name: "Group 1",
    teamLead: 1,
    studentsCount: studentsSource.filter((student) => student.group_id === 1)
      .length,
  },
  {
    id: 2,
    name: "Group 2",
    teamLead: 3,
    studentsCount: studentsSource.filter((student) => student.group_id === 2)
      .length,
  },
];

export const pairsSource: Pair[] = [
  {
    id: 1,
    student: 1,
    opponent: 4,
  },
  {
    id: 2,
    student: 2,
    opponent: 5,
  },
  {
    id: 3,
    student: 3,
    opponent: 6,
  },
];

export const studentsWithGroupsSource: StudentWithGroup[] = studentsSource.map(
  (student) => {
    const group = groupSource.find((group) => student.group_id == group.id);

    if (!group) {
      throw new Error("Group not found for student:" + student.id);
    }

    return {
      ...student,
      group,
    };
  }
);

export const hostsSource: Host[] = [
  {
    id: 1,
    firstName: "Yurii",
    lastName: "Nice",
  },
];

function createSession(
  id: number,
  title: string,
  description: string,
  host: number,
  date: Date,
  bestStudent: number,
  bestGroup: number,
  status: "active" | "finished"
): Session {
  return {
    id,
    title,
    description,
    host,
    date,
    bestStudent,
    bestGroup,
    status,
  };
}

export const sessionsSource = [
  createSession(
    1,
    "Patterns",
    "Learning all 25 patterns",
    1,
    new Date(),
    1,
    1,
    "finished"
  ),
  createSession(
    2,
    "Collections",
    "Collection framework Deep learning",
    1,
    new Date(),
    3,
    2,
    "finished"
  ),
  createSession(3, "Map", "Map internals", 1, new Date(), 2, 2, "finished"),
];

const sessionRecordsSource: SessionRecord[] = [];
const questionsPerSession = 3;
let idCounter = 1;
const actions: ["ask", "answer"] = ["ask", "answer"];

studentsSource.forEach((student, index) => {
  const opponentId =
    studentsSource[studentsSource.length - 1]?.id === student.id
      ? 1
      : student.id + 1;

  sessionsSource.forEach((session) => {
    actions.forEach((action) => {
      for (let i = 0; i < questionsPerSession; i++) {
        const record: SessionRecord = {
          id: idCounter++,
          sessionId: session.id,
          studentId: student.id,
          hostId: 1,
          score: i % 2 === 0 ? 1 : 0,
          hostNotes: i % 2 === 0 ? "Some note" : undefined,
          wasPresent: true,
          opponentId,
          action,
          question:
            action === "ask"
              ? `${getFullName(student)} ASK`
              : `${getFullName(student)} ANSWER`,
        };

        sessionRecordsSource.push(record);
      }
    });
  });
});

// GROUPS
export function fetchGroupByTeamLeadId(teamLeadId: number): Group | undefined {
  return groupSource.slice().find((group) => group.teamLead === teamLeadId);
}

export function fetchGroupById(groupId: number): Group | undefined {
  return groupSource.slice().find((group) => group.id === groupId);
}

export function fetchAllGroups(): Group[] {
  return groupSource.slice();
}

// STUDENTS
export function fetchStudentById(studentId: number): Student | undefined {
  return studentsSource.slice().find((student) => student.id === studentId);
}

export function fetchStudentsByGroup(groupId: number): Student[] {
  return studentsSource
    .slice()
    .filter((student) => student.group_id === groupId);
}
export function fetchStudentsWithGroup(): StudentWithGroup[] {
  return studentsWithGroupsSource.slice();
}

export function fetchStudentsWithGroupByGroupId(
  groupId: number
): StudentWithGroup[] {
  return studentsWithGroupsSource
    .slice()
    .filter((student) => student.group.id === groupId);
}

export function fetchAllStudents(): Student[] {
  return studentsSource.slice();
}

export function fetchStudentsByGroupIds(groupIds: number[]): Student[] {
  const result: Student[] = [];
  groupIds.forEach((groupId) => {
    const students = fetchStudentsByGroup(groupId);
    students.forEach((st) => result.push(st));
  });
  return result;
}

export function fetchStudentsByIds(studentsIds: number[]): Student[] {
  return studentsSource.filter(
    (st) => studentsIds.find((id) => st.id === id) !== undefined
  );
}

// SESSIONS
export function fetchSessionsCountByStudentId(studentId: number): number {
  return 2;
}

export function fetchSessionsByHostId(hostId: number): Session[] {
  return sessionsSource.slice().filter((session) => session.host === hostId);
}

export function fetchAllSessions(): Session[] {
  return sessionsSource.slice();
}

export function fetchSessionById(sessionId: number): Session | undefined {
  return sessionsSource.slice().find((session) => session.id === sessionId);
}

export function fetchSessionsByStudentId(studentId: number): Session[] {
  const result: Session[] = [];
  new Set(
    fetchSessionRecordsByStudentId(studentId).map((record) => record.sessionId)
  ).forEach((key) => {
    const candidate = sessionsSource.find((s) => s.id === key);
    if (candidate) result.push(candidate);
  });
  return result;
}

export function postCreateSession(dto: CreateSessionDto): Session {
  const newSession = {
    id: sessionsSource[sessionsSource.length - 1].id + 1,
    title: dto.title,
    description: dto.description,
    date: dto.date,
    status: dto.status,
    host: dto.host,
  };

  sessionsSource.push(newSession);
  return newSession;
}

//HOSTS
export function fetchAllHosts(): Host[] {
  return hostsSource.slice();
}

export function fetchHostById(hostId: number): Host | undefined {
  return hostsSource.slice().find((host) => host.id === hostId);
}

// SessionRecords
export function fetchAllSessionRecords(): SessionRecord[] {
  return sessionRecordsSource.slice();
}

export function fetchSessionRecordsBySessionAndStudent(
  sessionId: number,
  studentId: number
): SessionRecord[] {
  const result = sessionRecordsSource.filter(
    (record) => record.sessionId === sessionId && record.studentId === studentId
  );
  console.log(`STUDENT_ID ${studentId} SESSION_ID ${sessionId}`);
  console.log(result);
  return result;
}

export function fetchSessionRecordsByStudentId(
  studentId: number
): SessionRecord[] {
  return sessionRecordsSource.filter(
    (record) => record.studentId === studentId
  );
}

// START SESSION
export function fetchPairs(groups: Group[], absentStudents: Student[]): Pair[] {
  return pairsSource.slice();
}

export function addSessionRecord(record: SessionRecord): void {
  sessionRecordsSource.push(record);
}

export function addSession(session: Session): void {
  sessionsSource.push(session);
}

export function startSession(sessionId: number): void {
  const candidate = sessionsSource.find((s) => s.id === sessionId);
  if (!candidate) throw new Error(`Session with id [${sessionId}] not found`);
  candidate.status = SessionStatus.active;
}

export function closeSession(
  sessionId: number,
  bestStudent: number,
  bestGroup: number
) {
  const candidate = sessionsSource.find((s) => s.id === sessionId);
  if (!candidate) throw new Error(`Session with id [${sessionId}] not found`);
  candidate.status = SessionStatus.finished;
  candidate.bestStudent = bestStudent;
  candidate.bestGroup = bestGroup;
}

export function postCreateSessionRecords(dtos: CreateSessionRecordDto[]) {
  let recordId = sessionRecordsSource[sessionRecordsSource.length - 1].id + 1;

  const newRecords: SessionRecord[] = dtos.map((dto) => ({
    id: recordId++,
    ...dto,
  }));

  console.log("SOURCE");
  console.log(sessionRecordsSource);
  console.log("NEW RECORDS");
  console.log(newRecords);
  newRecords.forEach((record) => sessionRecordsSource.push(record));
  console.log("NEW SOURCE");
  console.log(sessionRecordsSource);
}
