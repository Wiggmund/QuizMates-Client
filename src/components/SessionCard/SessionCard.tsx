import React from "react";
import {
  GROUP_NOT_FOUND_BY_ID,
  HOST_NOT_FOUND_BY_ID,
  STUDENT_NOT_FOUND_BY_ID,
  Session,
  SessionStatus,
} from "../../model";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";
import {
  useGetGroupByIdQuery,
  useGetHostByIdQuery,
  useGetHostBySessionIdQuery,
  useGetStudentByIdQuery,
} from "../../redux";
import { ResourceNotFoundException } from "../../exceptions";
import { getFullName, getGroupNameOrUnknown } from "../../utils";
import { HOST_NOT_FOUND_BY_SESSION } from "../../model/Host";

type SessionBestBlockProps = {
  bestStudentId: number;
  bestGroupId: number;
};
const SessionBestBlock = ({
  bestStudentId,
  bestGroupId,
}: SessionBestBlockProps) => {
  const {
    data: bestStudent,
    isSuccess: isSuccessStudent,
    isError: isErrorStudent,
    error: errorStudent,
  } = useGetStudentByIdQuery(bestStudentId);
  const {
    data: bestGroup,
    isSuccess: isSuccessGroup,
    isError: isErrorGroup,
    error: errorGroup,
  } = useGetGroupByIdQuery(bestGroupId);

  if (!isSuccessStudent || !isSuccessGroup) {
    if (isErrorStudent)
      throw new ResourceNotFoundException(
        STUDENT_NOT_FOUND_BY_ID(bestStudentId)
      );
    if (isErrorGroup)
      throw new ResourceNotFoundException(GROUP_NOT_FOUND_BY_ID(bestGroupId));

    return <CircularProgress />;
  }

  const bestStudentFullName = getFullName(bestStudent);
  const bestGroupName = getGroupNameOrUnknown(bestGroup);

  return (
    <>
      <Stack>
        <Typography variant="caption" color="initial">
          Best student:
        </Typography>
        <Typography variant="body1" color="initial">
          {bestStudent && (
            <Link to={`${Endpoints.studentPage}/${bestStudent.id}`}>
              {bestStudentFullName}
            </Link>
          )}
          {bestStudent === undefined && bestStudentFullName}
        </Typography>
      </Stack>

      <Stack>
        <Typography variant="caption" color="initial">
          Best group:
        </Typography>
        <Typography variant="body1" color="initial">
          {bestGroup && (
            <Link to={`${Endpoints.groupPage}/${bestGroup.id}`}>
              {bestGroupName}
            </Link>
          )}
          {bestGroup === undefined && bestGroupName}
        </Typography>
      </Stack>
    </>
  );
};

type SessionCardHostBlockProps = {
  sessionId: number;
};
const SessionCardHostBlock = ({ sessionId }: SessionCardHostBlockProps) => {
  const {
    data: host,
    isSuccess: isSuccessHost,
    isError: isErrorHost,
    error: errorHost,
  } = useGetHostBySessionIdQuery(sessionId);

  if (!isSuccessHost) {
    if (isErrorHost) {
      throw new ResourceNotFoundException(HOST_NOT_FOUND_BY_SESSION(sessionId));
    }
    return null;
  }

  const hostFullName = getFullName(host);

  return (
    <Stack alignItems="center">
      <Typography variant="caption" color="initial">
        Host
      </Typography>
      <Typography variant="body1" color="primary">
        {host && (
          <Link to={`${Endpoints.hostPage}/${host.id}`}>{hostFullName}</Link>
        )}
        {host === undefined && hostFullName}
      </Typography>
    </Stack>
  );
};

interface SessionMarkerMap {
  [key: string]: string;
}

type SessionCardProps = {
  session: Session;
};
const SessionCard = ({ session }: SessionCardProps) => {
  const markerMap: SessionMarkerMap = {
    [SessionStatus.FINISHED]: grey[500],
    [SessionStatus.STARTED]: green[500],
  };

  const bestBlock =
    !session.bestGroup || !session.bestStudent ? null : (
      <SessionBestBlock
        bestGroupId={session.bestGroup}
        bestStudentId={session.bestStudent}
      />
    );

  const header = (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      sx={{ py: 2 }}
    >
      <Typography variant="h3" color="primary">
        {session.title}
      </Typography>
      <Typography variant="h6" color="initial">
        {new Date(session.date).toLocaleDateString()}
      </Typography>
    </Stack>
  );

  const descriptionBlock = (
    <Typography variant="h6" color="initial">
      {session.description}
    </Typography>
  );

  const infoBlock = (
    <Stack
      spacing={0.5}
      sx={{ py: 4 }}
      direction="row"
      alignItems="center"
      justifyContent="space-around"
    >
      <SessionCardHostBlock sessionId={session.id} />
      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          Status
        </Typography>
        <Typography variant="body1" color={markerMap[session.status]}>
          {session.status.toUpperCase()}
        </Typography>
      </Stack>

      {bestBlock}
    </Stack>
  );

  return (
    <Stack>
      {header}
      {descriptionBlock}
      {infoBlock}
    </Stack>
  );
};

export default SessionCard;
