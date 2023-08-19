import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { SessionsList } from "../../components";

type Props = {};

const Sessions = (props: Props) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" color="primary">
        Sessions
      </Typography>
      <SessionsList />
    </Container>
  );
};

export default Sessions;
