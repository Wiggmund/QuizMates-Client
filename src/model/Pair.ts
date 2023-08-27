export interface Pair {
  id: number;
  student: number;
  opponent: number;
}

export interface GenerateRandomPairsDto {
  groupsIds: number[];
  absentStudents: number[];
  byAllStudents: boolean;
}

export interface GenerateRandomPairsResponseDto {
  pairs: Pair[];
  unpairedStudentsIds: number[];
}

export const PAIR_NOT_FOUND_BY_ID = (id: number) =>
  `Pair with id [${id}] not found`;

export const PAIR_GENERATION_ERROR = () => `Failed to randomly generate pairs`;
