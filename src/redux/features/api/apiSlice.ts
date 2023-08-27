import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateSessionDto,
  CreateSessionRecordDto,
  GenerateRandomPairsDto,
  GenerateRandomPairsResponseDto,
  Group,
  Host,
  Pair,
  Session,
  SessionRecord,
  Student,
  UpdateSessionDto,
} from "../../../model";
import { API, BASE_URL } from "../../../application.config";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllHosts: builder.query<Host[], string>({
      query: () => API.hosts.getAll,
    }),
    getHostById: builder.query<Host, number>({
      query: (hostId) => API.hosts.getById(hostId),
    }),

    getAllGroups: builder.query<Group[], string>({
      query: () => API.groups.getAll,
    }),
    getGroupById: builder.query<Group, number>({
      query: (groupId) => API.groups.getById(groupId),
    }),
    getAllGroupStudents: builder.query<Student[], number>({
      query: (groupId) => API.groups.getAllGroupStudents(groupId),
    }),

    getAllPairs: builder.query<Pair[], string>({
      query: () => API.pairs.getAll,
    }),
    getPairById: builder.query<Pair, number>({
      query: (pairId) => API.pairs.getById(pairId),
    }),
    generateRandomPairs: builder.mutation<
      GenerateRandomPairsResponseDto,
      GenerateRandomPairsDto
    >({
      query: (dto) => ({
        url: API.pairs.generateRandom,
        method: "POST",
        body: dto,
      }),
    }),

    getAllStudents: builder.query<Student[], string>({
      query: () => API.students.getAll,
    }),
    getStudentById: builder.query<Student, number>({
      query: (studentId) => API.students.getById(studentId),
    }),

    getAllSessions: builder.query<Session[], string>({
      query: () => API.sessions.getAll,
    }),
    getSessionById: builder.query<Session, number>({
      query: (sessionId) => API.sessions.getById(sessionId),
    }),
    createSession: builder.mutation<number, CreateSessionDto>({
      query: (dto) => ({
        url: API.sessions.create,
        method: "POST",
        body: dto,
      }),
    }),
    updateSession: builder.mutation<void, UpdateSessionDto>({
      query: (dto) => ({
        url: API.sessions.update,
        method: "PUT",
        body: dto,
      }),
    }),

    getAllSessionRecords: builder.query<SessionRecord[], string>({
      query: () => API.sessionRecords.getAll,
    }),
    getAllSessionRecordsByStudentId: builder.query<SessionRecord[], number>({
      query: (studentId) => API.sessionRecords.getAllByStudentId(studentId),
    }),
    getAllSessionRecordsBySessionId: builder.query<SessionRecord[], number>({
      query: (sessionId) => API.sessionRecords.getAllBySessionId(sessionId),
    }),
    getSessionRecordById: builder.query<SessionRecord, number>({
      query: (sessionRecordId) => API.sessionRecords.getById(sessionRecordId),
    }),
    createSessionRecord: builder.mutation<void, CreateSessionRecordDto>({
      query: (dto) => ({
        url: API.sessionRecords.create,
        method: "POST",
        body: dto,
      }),
    }),
  }),
});

export const {
  useGetAllHostsQuery,
  useGetAllGroupsQuery,
  useGetAllPairsQuery,
  useGetAllStudentsQuery,
  useGetAllSessionsQuery,
  useGetAllSessionRecordsQuery,

  useGetHostByIdQuery,
  useGetGroupByIdQuery,
  useGetPairByIdQuery,
  useGetStudentByIdQuery,
  useGetSessionByIdQuery,
  useGetSessionRecordByIdQuery,

  useGetAllGroupStudentsQuery,

  useGetAllSessionRecordsByStudentIdQuery,
  useGetAllSessionRecordsBySessionIdQuery,

  useGenerateRandomPairsMutation,
  useUpdateSessionMutation,
  useCreateSessionRecordMutation,
  useCreateSessionMutation,
} = apiSlice;
