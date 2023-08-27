import React from "react";
import Container from "@mui/material/Container";
import { AppBar, SessionRecordAccordion } from "../../components";
import { ResourceNotFoundException } from "../../exceptions";
import { CircularProgress } from "@mui/material";
import { ALL_SESSION_FETCH_ERROR } from "../../model";
import { useGetAllSessionsQuery } from "../../redux";

type Props = {};

const SessionRecords = (props: Props) => {
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
