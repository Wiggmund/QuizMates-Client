import React, { PropsWithChildren } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  fetchAllGroups,
  fetchHostById,
  fetchSessionRecordsBySessionAndStudent,
  fetchStudentsByGroup,
} from "../../data";
import { getFullName } from "../../utils";

import { Group, Session, SessionRecord, Student } from "../../model";
import SessionRecordsTable from "../SessionRecordsTable/SessionRecordsTable";
import SimpleChip from "../SimpleChip/SimpleChip";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";

const getScore = (
  sessionId: number,
  students: Student[],
  sessionRecords?: SessionRecord[]
): number => {
  let sum = 0;

  students.forEach((student) => {
    console.log(`Session (${sessionId}) student ${student.firstName}`);
    if (!sessionRecords) {
      sessionRecords = fetchSessionRecordsBySessionAndStudent(
        sessionId,
        student.id
      );
    }
    console.log(sessionRecords);

    const studentScoreSum = sessionRecords.reduce(
      (acc, next) => acc + next.score,
      0
    );

    sum += studentScoreSum;
  });

  return sum;
};

type SessionAccordionProps = {
  session: Session;
};

const SessionAccordion = ({
  session,
  children,
}: PropsWithChildren<SessionAccordionProps>) => {
  const host = fetchHostById(session.host);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent="space-between"
          flexGrow={1}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>{session ? session.title : "unknown"}</Typography>
            <Typography variant="caption" color="initial">
              {host ? (
                <Link to={`${Endpoints.hostPage}/${host.id}`}>
                  {getFullName(host)}(host)
                </Link>
              ) : (
                "unknown (host)"
              )}
            </Typography>
          </Stack>
          <Typography variant="caption" color="initial">
            {session.date.toLocaleDateString()}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

type GroupAccordionProps = {
  group: Group;
  best: boolean;
  score: number;
};
const GroupAccordion = ({
  group,
  children,
  best,
  score = 0,
}: PropsWithChildren<GroupAccordionProps>) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography color="initial">
            {group ? group.name : "unknown"}
          </Typography>
          <SimpleChip type="score" score={score} />
          {best && <SimpleChip type="best" />}
        </Stack>
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
  const studentScoreSum = getScore(session.id, [student], sessionRecords);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>{getFullName(student)}</Typography>
          <SimpleChip type="score" score={studentScoreSum} />
          {session.bestStudent === student.id && <SimpleChip type="best" />}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <SessionRecordsTable sessionRecords={sessionRecords} />
      </AccordionDetails>
    </Accordion>
  );
};

type GroupAccordionsListProps = {
  session: Session;
  groups: Group[];
};

const GroupAccordionsList = ({
  groups,
  session,
}: PropsWithChildren<GroupAccordionsListProps>) => {
  return (
    <>
      {groups.map((group) => {
        const students = fetchStudentsByGroup(group.id);

        return (
          <GroupAccordion
            group={group}
            key={group.id}
            best={session.bestGroup === group.id}
            score={getScore(session.id, students)}
          >
            {students.map((student) => (
              <StudentAccordion
                student={student}
                session={session}
                key={student.id}
              />
            ))}
          </GroupAccordion>
        );
      })}
    </>
  );
};

type Props = {
  session: Session;
};
const SessionRecordAccordion = ({ session }: Props) => {
  const groups = fetchAllGroups().filter((group) => group.studentsCount > 0);

  return (
    <SessionAccordion session={session}>
      <GroupAccordionsList session={session} groups={groups} />
    </SessionAccordion>
  );
};

export default SessionRecordAccordion;
