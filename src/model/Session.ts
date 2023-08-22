export const SessionStatus: {
  finished: any;
  active: any;
  idle: any;
} = {
  finished: "finished",
  active: "active",
  idle: "idle",
};

export interface Session {
  id: number;
  title: string;
  description: string;
  host: number;
  date: Date;
  bestStudent: number;
  bestGroup: number;
  status: keyof typeof SessionStatus;
}
