import { Group } from "./Group";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  group_id: number;
}

export type StudentWithGroup = Omit<Student, "group_id"> & {
  group: Group;
};

export interface StudentsMap {
  [key: string]: Student;
}
