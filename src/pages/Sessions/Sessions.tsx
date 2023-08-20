import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppBar, SessionsTable } from "../../components";

type Props = {};

const Sessions = (props: Props) => {
  return (
    <Container maxWidth="lg">
      <AppBar />
      <Typography variant="h1" color="primary">
        Sessions
      </Typography>
      <SessionsTable />
    </Container>
  );
};

export default Sessions;
