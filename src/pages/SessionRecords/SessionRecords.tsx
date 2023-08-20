import React from "react";
import Container from "@mui/material/Container";
import { AppBar, SessionRecordAccordion } from "../../components";
import { fetchAllSessions } from "../../data";

type Props = {};

const SessionRecords = (props: Props) => {
  const sessions = fetchAllSessions();

  const content = sessions.map((session) => (
    <SessionRecordAccordion key={session.id} session={session} />
  ));

  return (
    <Container maxWidth="lg">
      <AppBar />
      {content}
    </Container>
  );
};

export default SessionRecords;
