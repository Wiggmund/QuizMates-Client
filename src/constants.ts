export const Endpoints = {
  homePage: "/",
  sessionsPage: "/sessions",
  studentPage: "/students",
  groupPage: "/groups",
  hostPage: "/hosts",
  sessionRecordsPage: "/sessionRecords",
  sessionCreate: "/sessions/create",
  sessionConfiguration: "/sessions/configure",
  sessionQuiz: "/sessions/quiz",
};

const SessionCreateFormFields = ["title", "description"];
export type CreateSessionFormData = {
  title: string;
  description: string;
};

export function getSessionCreateFormData(): FormData {
  return getData(SessionCreateFormFields, "session");
}

type FieldsDefaultValues = { [key: string]: any };
type FieldInfo = {
  id: string;
  name: string;
  label: string;
};
type FormData = {
  defaultValues: FieldsDefaultValues;
  fieldsInfo: FieldInfo[];
};
function getData(fields: string[], entityName: string): FormData {
  let result: FormData = {
    defaultValues: {},
    fieldsInfo: [],
  };

  fields.forEach((f) => {
    result.defaultValues[f] = "";

    result.fieldsInfo.push({
      id: `${entityName}-${f}-id`,
      name: f,
      label: f[0].toUpperCase() + f.slice(1),
    });
  });

  return result;
}
