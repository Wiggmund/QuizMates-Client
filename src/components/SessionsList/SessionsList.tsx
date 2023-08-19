import React from "react";
import { sessionsSource } from "../../data";
import SessionCard from "../SessionCard/SessionCard";
import { Stack } from "@mui/material";

type Props = {};

const SessionsList = (props: Props) => {
  const sessions = sessionsSource.slice();

  const content = sessions.map((session) => (
    <SessionCard session={session} key={session.id} />
  ));

  return (
    <Stack direction="column" spacing={6}>
      {content}
    </Stack>
  );
};

export default SessionsList;
