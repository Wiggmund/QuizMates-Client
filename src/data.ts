import {
  Group,
  Host,
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
    group_id: 2,
    isTeamLead: false,
  },
  {
    id: 4,
    firstName: "John",
    lastName: "Don",
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

groupSource.forEach((group) => {
  if (group.teamLead !== -1) {
    const student = studentsSource.find((st) => st.id === group.teamLead);

    if (student) student.isTeamLead = true;
  }
});

export const studentsWithGroupsSource: StudentWithGroup[] = studentsSource.map(
  (student) => {
    const group =
      groupSource.find((group) => student.group_id == group.id) ||
      groupSource[3];

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

type SessionTitleDescription = Pick<Session, "title"> &
  Pick<Session, "description">;

const studentsIds = studentsSource.map((st) => st.id);
const groupsIds = groupSource.map((group) => group.id);
const statusVariants = ["active", "finished"];

const randIndex = (arr: any[]) => {
  return arr[Math.trunc(Math.random() * arr.length)];
};

const sessionTitlesDescriptions: SessionTitleDescription[] = [
  {
    title: "Patterns",
    description: "Learning all 25 patterns",
  },
  {
    title: "Collections",
    description: "Main Collection Framework interfaces",
  },
  {
    title: "Hash table",
    description: "Map internals",
  },
];

export const sessionsSource = sessionTitlesDescriptions.map((item, index) => {
  return {
    id: index + 1,
    title: item.title,
    description: item.description,
    host: 1,
    date: new Date(),
    bestStudent: randIndex(studentsIds),
    bestGroup: randIndex(groupsIds),
    status: randIndex(statusVariants),
  } as Session;
});

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
          hostId: hostsSource[0].id || 1,
          score: Math.random() > 0.5 ? 1 : 0,
          hostNotes: Math.random() > 0.5 ? "Some note" : undefined,
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
  return sessionRecordsSource
    .slice()
    .filter(
      (record) =>
        record.sessionId === sessionId && record.studentId === studentId
    );
}
