import React from "react";
import Container from "@mui/material/Container";
import { AppBar, SessionCard } from "../../components";
import { useParams } from "react-router-dom";
import { fetchSessionById } from "../../data";
import { Typography } from "@mui/material";

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
    </Container>
  );
};

export default Session;
