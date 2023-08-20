import React from "react";
import { Session, SessionStatus } from "../../model";
import { Box, Stack, Typography, Button, Paper } from "@mui/material";
import {
  fetchGroupById,
  fetchHostById,
  fetchStudentById,
  groupSource,
  hostsSource,
  studentsSource,
} from "../../data";
import { green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";

interface SessionMarkerMap {
  [key: string]: string;
}

type Props = {
  session: Session;
};

const SessionCard = ({ session }: Props) => {
  const bestStudent = fetchStudentById(session.bestStudent);
  const bestGroup = fetchGroupById(session.bestGroup);
  const host = fetchHostById(session.host);

  const markerMap: SessionMarkerMap = {
    [SessionStatus.finished]: grey[500],
    [SessionStatus.active]: green[500],
  };

  const bestStudentFullName = bestStudent
    ? `${bestStudent.firstName} ${bestStudent.lastName}`
    : "unknown";
  const hostFullName = host ? `${host.firstName} ${host.lastName}` : "unknown";
  const bestGroupName = bestGroup ? bestGroup.name : "unknown";

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
        {session.date.toLocaleDateString()}
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

      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          Status
        </Typography>
        <Typography variant="body1" color={markerMap[session.status]}>
          {session.status.toUpperCase()}
        </Typography>
      </Stack>

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
