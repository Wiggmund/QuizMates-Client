import { Group } from "./Group";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  group_id: number;
}

export interface StudentWithGroup extends Student {
  group: Group;
}
