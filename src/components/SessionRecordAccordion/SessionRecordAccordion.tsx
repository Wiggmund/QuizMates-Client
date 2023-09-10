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
  SESSION_GROUP_SCORE_ERROR,
  SESSION_PRESENT_STUDENTS_ERROR,
  SESSION_RECS_FETCH_BY_SESSION_AND_STUDENT_ERROR,
  SESSION_RECS_FETCH_BY_SESSION_ERROR,
  SESSION_RECS_FETCH_BY_STUDENT_ERROR,
  SESSION_STUDENT_SCORE_ERROR,
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
  useGetHostBySessionIdQuery,
  useGetSessionRecordsByStudentIdAndSessionIdQuery,
} from "../../redux";
import { ResourceNotFoundException } from "../../exceptions";
import { HOST_NOT_FOUND_BY_SESSION } from "../../model/Host";
import {
  useGetSessionGroupScoreQuery,
  useGetSessionPresentStudentsQuery,
  useGetSessionStudentScoreQuery,
} from "../../redux/features/api/apiSlice";

const getScore = (sessionRecords: SessionRecord[]): number =>
  sessionRecords.reduce((acc, record) => acc + record.score, 0);

type StudentAccordionProps = {
  student: Student;
  session: Session;
};
const StudentAccordion = ({ student, session }: StudentAccordionProps) => {
  const {
    data: studentScore,
    isSuccess,
    isError,
    error,
  } = useGetSessionStudentScoreQuery({
    sessionId: session.id,
    studentId: student.id,
  });

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(
        SESSION_STUDENT_SCORE_ERROR(session.id, student.id)
      );

    return null;
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>{getFullName(student)}</Typography>
          <SimpleChip type="score" score={studentScore} />
          {session.bestStudent === student.id && <SimpleChip type="best" />}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <SessionRecordsTable studentId={student.id} sessionId={session.id} />
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
  } = useGetHostBySessionIdQuery(session.id);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(
        HOST_NOT_FOUND_BY_SESSION(session.id)
      );

    return null;
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
            <SessionAccordionHostLink hostId={host.id} />
          </Stack>
          <Typography variant="caption" color="initial">
            {`${session.date}`}
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
  presentStudents: Student[];
};
const GroupAccordion = ({
  group,
  best,
  session,
  presentStudents,
}: GroupAccordionProps) => {
  const {
    data: groupScore,
    isSuccess,
    isError,
    error,
  } = useGetSessionGroupScoreQuery({
    sessionId: session.id,
    groupId: group.id,
  });

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(
        SESSION_GROUP_SCORE_ERROR(session.id, group.id)
      );

    return null;
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
          <SimpleChip type="score" score={groupScore} />
          {best && <SimpleChip type="best" />}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {presentStudents.map((student) => (
          <StudentAccordion
            student={student}
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
type GroupDict = {
  [key: number]: Student[];
};
const GroupAccordionsList = ({ groups, session }: GroupAccordionsListProps) => {
  const {
    data: presentStudents,
    isSuccess,
    isError,
    error,
  } = useGetSessionPresentStudentsQuery(session.id);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(
        SESSION_PRESENT_STUDENTS_ERROR(session.id)
      );

    return null;
  }

  const studentsByGroup: GroupDict = {};
  groups.forEach((g) => {
    const groupPresentStudents = presentStudents.filter(
      (st) => st.groupId === g.id
    );
    studentsByGroup[g.id] = groupPresentStudents;
  });

  return (
    <>
      {groups.map((group) => {
        return (
          <GroupAccordion
            group={group}
            session={session}
            key={group.id}
            best={session.bestGroup === group.id}
            presentStudents={studentsByGroup[group.id]}
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
