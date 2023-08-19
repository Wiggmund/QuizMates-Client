import React from "react";
import { Session, SessionStatus } from "../../model";
import { Box, Stack, Typography, Button, Paper } from "@mui/material";
import { CircleRounded } from "@mui/icons-material";
import { groupSource, hostsSource, studentsSource } from "../../data";
import { green, grey } from "@mui/material/colors";

interface SessionMarkerMap {
  [key: string]: string;
}

type Props = {
  session: Session;
};

const SessionCard = ({ session }: Props) => {
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

  const hostBlock = (
    <Stack justifyContent="space-between" flexGrow={1}>
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
    </Stack>
  );

  const cardHeader = (
    <Stack justifyContent="space-between" alignItems="center" direction="row">
      <Typography variant="h3" color="primary">
        {session.title}
      </Typography>
      <Typography variant="h6" color="initial">
        {session.date.toLocaleDateString()}
      </Typography>
    </Stack>
  );

  const cardContent = (
    <Stack direction="column" spacing={1} py={4}>
      <Typography variant="h6" color="initial">
        {session.description}
      </Typography>

      <Stack
        spacing={0.5}
        sx={{ pl: 4 }}
        direction="row"
        alignItems="center"
        justifyContent="space-around"
      >
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
    </Stack>
  );

  const cardBottom = (
    <Stack alignItems="center">
      <Button variant="contained" color="primary" sx={{ px: 6 }}>
        Details
      </Button>
    </Stack>
  );

  return (
    <Paper sx={{ p: 4 }}>
      <Stack direction="row" spacing={4}>
        <Stack>{hostBlock}</Stack>
        <Stack alignItems="stretch" flexGrow={1}>
          {cardHeader}
          {cardContent}
          {cardBottom}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SessionCard;
