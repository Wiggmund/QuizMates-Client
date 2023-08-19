export const SessionStatus: {
  finished: any;
  active: any;
} = {
  finished: "finished",
  active: "active",
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
