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
