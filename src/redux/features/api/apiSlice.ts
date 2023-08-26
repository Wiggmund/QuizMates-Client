import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Group, Host, Pair, SessionRecord, Student } from "../../../model";
import { API, BASE_URL } from "../../../application.config";
import { Session } from "inspector";

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
} = apiSlice;
