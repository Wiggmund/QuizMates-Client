import { Group, Session } from "./model";

type NamedEntity = {
  firstName?: string;
  lastName?: string;
};
export const getFullName = (target: NamedEntity) => {
  const doHaveFirstName = !target.firstName;
  const doHaveLastName = !target.lastName;

  if (!doHaveFirstName && doHaveLastName) {
    return target.lastName;
  }

  if (!doHaveLastName && doHaveFirstName) {
    return target.firstName;
  }

  return `${target.firstName} ${target.lastName}`;
};

export function getGroupNameOrUnknown(group: Group | undefined): string {
  return group ? group.name : "unknown";
}
export function getSessionTitleOrUnknown(session: Session | undefined): string {
  return session ? session.title : "unknown";
}

export function distinct<T>(list: T[]): T[] {
  const result: T[] = [];

  list.forEach((item) => {
    if (result.find((i) => i === item) !== undefined) {
      result.push(item);
    }
  });

  return result;
}
