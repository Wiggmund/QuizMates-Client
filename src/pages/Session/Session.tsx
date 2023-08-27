import React from "react";
import Container from "@mui/material/Container";
import { AppBar, SessionCard, SessionRecordAccordion } from "../../components";
import { useParams } from "react-router-dom";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useGetSessionByIdQuery } from "../../redux";
import { SESSION_NOT_FOUND_BY_ID } from "../../model";
import { ResourceNotFoundException } from "../../exceptions";

type SessionUrlParams = {
  sessionId: string;
};

type Props = {};

const Session = (props: Props) => {
  const sessionId = Number.parseInt(
    useParams<SessionUrlParams>().sessionId as string
  );

  const {
    data: session,
    isSuccess,
    isError,
    error,
  } = useGetSessionByIdQuery(sessionId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(SESSION_NOT_FOUND_BY_ID(sessionId));

    return <CircularProgress />;
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
