export interface Host {
  id: number;
  firstName: string;
  lastName: string;
}

export const HOST_NOT_FOUND_BY_ID = (id: number) =>
  `Host with id [${id}] not found`;
export const HOST_NOT_FOUND_BY_SESSION = (sessionId: number) =>
  `Host not found by session id [${sessionId}]`;

export const ALL_HOSTS_FETCH_ERROR = () => `Failed to fetch all hosts`;
