import React, { PropsWithChildren } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  fetchAllGroups,
  fetchAllStudents,
  fetchGroupById,
  fetchHostById,
  fetchSessionRecordsBySessionAndStudent,
  fetchStudentsByGroup,
} from "../../data";
import { getFullName } from "../../utils";

import { Group, Host, Session, Student } from "../../model";
import SessionRecordsTable from "../SessionRecordsTable/SessionRecordsTable";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { group } from "console";
import studentsSlice from "../../redux/features/student/studentsSlice";

type SessionAccordionProps = {
  session: Session;
};
const SessionAccordion = ({
  session,
  children,
}: PropsWithChildren<SessionAccordionProps>) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{session ? session.title : "unknown"}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

type GroupAccordionProps = {
  group: Group;
};
const GroupAccordion = ({
  group,
  children,
}: PropsWithChildren<GroupAccordionProps>) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{group ? group.name : "unknown"}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

type StudentAccordionProps = {
  student: Student;
  session: Session;
};

const StudentAccordion = ({ student, session }: StudentAccordionProps) => {
  const sessionRecords = fetchSessionRecordsBySessionAndStudent(
    session.id,
    student.id
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{getFullName(student)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SessionRecordsTable sessionRecords={sessionRecords} />
      </AccordionDetails>
    </Accordion>
  );
};

type Props = {
  session: Session;
};
const SessionRecordAccordion = ({ session }: Props) => {
  const groups = fetchAllGroups();
  const students = fetchAllStudents();

  return (
    <SessionAccordion session={session}>
      {groups.map((group) => (
        <GroupAccordion group={group} key={group.id}>
          {fetchStudentsByGroup(group.id).map((student) => (
            <StudentAccordion
              student={student}
              session={session}
              key={student.id}
            />
          ))}
        </GroupAccordion>
      ))}
    </SessionAccordion>
  );
};

export default SessionRecordAccordion;
