import { group } from "console";
import {
  Group,
  Host,
  Session,
  SessionStatus,
  Student,
  StudentWithGroup,
} from "./model";

export const studentsSource: Student[] = [
  {
    id: 1,
    firstName: "Sem",
    lastName: "Vin",
    group_id: 1,
  },
  {
    id: 2,
    firstName: "Dean",
    lastName: "Vin",
    group_id: 1,
  },
  {
    id: 3,
    firstName: "Alex",
    lastName: "Trim",
    group_id: 2,
  },
  {
    id: 4,
    firstName: "John",
    lastName: "Don",
    group_id: 2,
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
  {
    id: 3,
    name: "Default",
    teamLead: -1,
    studentsCount: studentsSource.filter((student) => student.group_id === 3)
      .length,
  },
];

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
