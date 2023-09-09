const SERVER_HOST = "http://localhost";
const SERVER_PORT = 8080;
const SERVER_BASE_URL = "quizmates";
export const BASE_URL = `${SERVER_HOST}:${SERVER_PORT}/${SERVER_BASE_URL}`;

export const API = {
  hosts: {
    getAll: "/hosts",
    getById: (hostId: number) => `/hosts?hostId=${hostId}`,
    getHostBySessionId: (sessionId: number) => {
      const url = `/session?sessionId=${sessionId}`;
      console.log("URL");
      console.log(url);
      return url;
    },
    create: "/hosts",
    update: "/hosts",
    deleteById: "/hosts",
  },
  groups: {
    getAll: "/groups",
    getById: (groupId: number) => `/groups?groupId=${groupId}`,
    getAllGroupStudents: (groupId: number) =>
      `/groups/students?groupId=${groupId}`,
    create: "/groups",
    update: "/groups",
    deleteById: "/groups",
  },
  pairs: {
    getAll: "/pairs",
    getById: (pairId: number) => `/pairs?pairId=${pairId}`,
    generateRandom: "students/pairs",
    create: "/pairs",
    update: "/pairs",
    deleteById: "/pairs",
  },
  students: {
    getAll: "/students",
    getById: (studentId: number) => `/students?studentId=${studentId}`,
    create: "/students",
    update: "/students",
    deleteById: "/students",
  },
  sessions: {
    getAll: "/sessions",
    getById: (sessionId: number) => `/sessions?sessionId=${sessionId}`,
    getHostSessions: (hostId: number) => `/sessions?hostId=${hostId}`,
    create: "/sessions",
    update: "/sessions",
    deleteById: "/sessions",
  },
  sessionRecords: {
    getAll: "/sessionsrecords",
    getById: (sessionsRecordId: number) =>
      `/sessionsrecords?sessionRecordId=${sessionsRecordId}`,
    getAllByStudentId: (studentId: number) =>
      `/sessionsrecords?studentId=${studentId}`,
    getByStudentIdAndSessionId: (studentId: number, sessionId: number) =>
      `/sessionsrecords?studentId=${studentId}&sessionId=${sessionId}`,
    getAllBySessionId: (sessionId: number) =>
      `/sessionsrecords?sessionId=${sessionId}`,
    create: "/sessionsrecords",
    update: "/sessionsrecords",
    deleteById: "/sessionsrecords",
  },
};
