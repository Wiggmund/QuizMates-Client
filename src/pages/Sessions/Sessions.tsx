import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppBar, SessionsTable } from "../../components";
import { fetchAllSessions } from "../../data";

type Props = {};

const Sessions = (props: Props) => {
  const sessions = fetchAllSessions();

  return (
    <Container maxWidth="lg">
      <AppBar />
      <Typography variant="h1" color="primary">
        Sessions
      </Typography>
      <SessionsTable sessions={sessions} />
    </Container>
  );
};

export default Sessions;
