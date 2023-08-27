import React, { PropsWithChildren, useRef } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getFullName,
  getGroupNameOrUnknown,
  getSessionTitleOrUnknown,
} from "../../utils";

import {
  ALL_GROUPS_FETCH_ERROR,
  GROUP_STUDENTS_FETCH_ERROR,
  Group,
  HOST_NOT_FOUND_BY_ID,
  SESSION_RECS_FETCH_BY_SESSION_ERROR,
  SESSION_RECS_FETCH_BY_STUDENT_ERROR,
  Session,
  SessionRecord,
  Student,
} from "../../model";
import SessionRecordsTable from "../SessionRecordsTable/SessionRecordsTable";
import SimpleChip from "../SimpleChip/SimpleChip";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";
import {
  useGetAllGroupStudentsQuery,
  useGetAllGroupsQuery,
  useGetAllSessionRecordsBySessionIdQuery,
  useGetAllSessionRecordsByStudentIdQuery,
  useGetHostByIdQuery,
} from "../../redux";
import { ResourceNotFoundException } from "../../exceptions";

const getScore = (sessionRecords: SessionRecord[]): number =>
  sessionRecords.reduce((acc, record) => acc + record.score, 0);

type StudentAccordionProps = {
  student: Student;
  session: Session;
  groupStudentsScore: React.MutableRefObject<number>;
};
const StudentAccordion = ({
  student,
  session,
  groupStudentsScore,
}: StudentAccordionProps) => {
  const {
    data: sessionRecords,
    isSuccess,
    isError,
    error,
  } = useGetAllSessionRecordsBySessionIdQuery(session.id);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(
        SESSION_RECS_FETCH_BY_SESSION_ERROR(session.id)
      );

    return <CircularProgress />;
  }

  const studentSessionRecords = sessionRecords.filter(
    (record) => record.studentId === student.id
  );
  const studentScoreSum = getScore(studentSessionRecords);
  groupStudentsScore.current += studentScoreSum;

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
        <SessionRecordsTable studentId={student.id} />
      </AccordionDetails>
    </Accordion>
  );
};

type SessionAccordionHostLinkProps = {
  hostId: number;
};
const SessionAccordionHostLink = ({
  hostId,
}: SessionAccordionHostLinkProps) => {
  const { data: host, isSuccess, isError, error } = useGetHostByIdQuery(hostId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(HOST_NOT_FOUND_BY_ID(hostId));

    return null;
  }

  return (
    <Typography variant="caption" color="initial">
      {host ? (
        <Link to={`${Endpoints.hostPage}/${host.id}`}>
          {getFullName(host)}(host)
        </Link>
      ) : (
        getFullName(host)
      )}
    </Typography>
  );
};

type SessionAccordionProps = {
  session: Session;
};
const SessionAccordion = ({
  session,
  children,
}: PropsWithChildren<SessionAccordionProps>) => {
  const {
    data: host,
    isSuccess,
    isError,
    error,
  } = useGetHostByIdQuery(session.host);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(HOST_NOT_FOUND_BY_ID(session.host));

    return <CircularProgress />;
  }

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
            <Typography>{getSessionTitleOrUnknown(session)}</Typography>
            <SessionAccordionHostLink hostId={session.host} />
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
  session: Session;
};
const GroupAccordion = ({ group, best, session }: GroupAccordionProps) => {
  const groupStudentsScore = useRef<number>(0);
  const {
    data: groupStudents,
    isSuccess,
    isError,
    error,
  } = useGetAllGroupStudentsQuery(group.id);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(GROUP_STUDENTS_FETCH_ERROR(group.id));

    return <CircularProgress />;
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography color="initial">
            {getGroupNameOrUnknown(group)}
          </Typography>
          <SimpleChip type="score" score={groupStudentsScore.current} />
          {best && <SimpleChip type="best" />}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {groupStudents.map((student) => (
          <StudentAccordion
            student={student}
            groupStudentsScore={groupStudentsScore}
            session={session}
            key={student.id}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

type GroupAccordionsListProps = {
  session: Session;
  groups: Group[];
};
const GroupAccordionsList = ({ groups, session }: GroupAccordionsListProps) => {
  return (
    <>
      {groups.map((group) => {
        return (
          <GroupAccordion
            group={group}
            session={session}
            key={group.id}
            best={session.bestGroup === group.id}
          />
        );
      })}
    </>
  );
};

type SessionRecordAccordionProps = {
  session: Session;
};
const SessionRecordAccordion = ({ session }: SessionRecordAccordionProps) => {
  const { data: groups, isSuccess, isError, error } = useGetAllGroupsQuery("");

  if (!isSuccess) {
    if (isError) throw new ResourceNotFoundException(ALL_GROUPS_FETCH_ERROR());

    return <CircularProgress />;
  }

  return (
    <SessionAccordion session={session}>
      <GroupAccordionsList session={session} groups={groups} />
    </SessionAccordion>
  );
};

export default SessionRecordAccordion;
