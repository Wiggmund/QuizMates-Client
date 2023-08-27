import { Student } from "./Student";

export interface Group {
  id: number;
  name: string;
  studentsAmount: number;
  teamleadId: number;
}

export const GROUP_NOT_FOUND_BY_ID = (id: number) =>
  `Group with id [${id}] not found`;

export const GROUP_STUDENTS_FETCH_ERROR = (id: number) =>
  `Failed to fetch students for group with id [${id}]`;

export const ALL_GROUPS_FETCH_ERROR = () => `Failed to fetch all groups`;
