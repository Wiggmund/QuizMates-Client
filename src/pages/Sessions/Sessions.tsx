import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppBar, SessionsTable } from "../../components";
import { useGetAllSessionsQuery } from "../../redux";
import { CircularProgress } from "@mui/material";
import { ResourceNotFoundException } from "../../exceptions";
import { ALL_SESSION_FETCH_ERROR } from "../../model";

type Props = {};

const Sessions = (props: Props) => {
  const {
    data: sessions,
    isSuccess,
    isError,
    error,
  } = useGetAllSessionsQuery("");

  if (!isSuccess) {
    if (isError) throw new ResourceNotFoundException(ALL_SESSION_FETCH_ERROR());

    return <CircularProgress />;
  }

  const sessionsIds = sessions.map((session) => session.id);

  return (
    <Container maxWidth="lg">
      <AppBar />
      <Typography variant="h1" color="primary">
        Sessions
      </Typography>
      <SessionsTable sessionsIds={sessionsIds} />
    </Container>
  );
};

export default Sessions;
