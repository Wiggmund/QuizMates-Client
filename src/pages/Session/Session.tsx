import React from "react";
import Container from "@mui/material/Container";
import { AppBar, SessionCard } from "../../components";

type Props = {};

const Session = (props: Props) => {
  return (
    <Container maxWidth="lg">
      <AppBar />
      <SessionCard />
    </Container>
  );
};

export default Session;
