import { Group } from "./Group";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  groupId: number;
  isTeamLead: boolean;
}

export type StudentWithGroup = Omit<Student, "groupId"> & {
  group: Group;
};

export interface StudentsMap {
  [key: string]: Student;
}

export const STUDENT_NOT_FOUND_BY_ID = (id: number) =>
  `Student with id [${id}] not found`;

export const ALL_STUDENTS_FETCH_ERROR = () => `Failed to fetch all students`;
