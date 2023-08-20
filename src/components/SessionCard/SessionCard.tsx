import React from "react";
import { Session, SessionStatus } from "../../model";
import { Box, Stack, Typography, Button, Paper } from "@mui/material";
import { CircleRounded } from "@mui/icons-material";
import {
  groupSource,
  hostsSource,
  sessionsSource,
  studentsSource,
} from "../../data";
import { green, grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";

type SessionUrlParams = {
  sessionId: string;
};

interface SessionMarkerMap {
  [key: string]: string;
}

type Props = {};

const SessionCard = (props: Props) => {
  const sessions = sessionsSource.slice();
  const sessionId = Number.parseInt(
    useParams<SessionUrlParams>().sessionId as string
  );
  console.log(sessionId);
  const session = sessions.find((st) => st.id === sessionId);

  if (!session) {
    return (
      <Typography variant="h1" color="error">
        Session with {sessionId} NOT FOUND
      </Typography>
    );
  }

  const bestStudent = studentsSource
    .slice()
    .find((st) => st.id === session.bestStudent);
  const bestGroup = groupSource
    .slice()
    .find((gr) => gr.id === session.bestGroup);

  const host = hostsSource.slice().find((h) => h.id === session.host);

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
          {hostFullName}
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
          {bestStudentFullName}
        </Typography>
      </Stack>

      <Stack>
        <Typography variant="caption" color="initial">
          Best group:
        </Typography>
        <Typography variant="body1" color="initial">
          {bestGroupName}
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
