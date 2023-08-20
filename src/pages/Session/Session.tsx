import React from "react";
import Container from "@mui/material/Container";
import { AppBar, SessionCard, SessionRecordAccordion } from "../../components";
import { useParams } from "react-router-dom";
import { fetchSessionById } from "../../data";
import { Stack, Typography } from "@mui/material";

type SessionUrlParams = {
  sessionId: string;
};

type Props = {};

const Session = (props: Props) => {
  const sessionId = Number.parseInt(
    useParams<SessionUrlParams>().sessionId as string
  );
  const session = fetchSessionById(sessionId);

  if (!session) {
    return (
      <Typography variant="h1" color="error">
        Session with {sessionId} NOT FOUND
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <AppBar />
      <SessionCard session={session} />
      <Stack spacing={2}>
        <Typography variant="subtitle1" color="initial">
          Session details:
        </Typography>
        <SessionRecordAccordion session={session} />
      </Stack>
    </Container>
  );
};

export default Session;
