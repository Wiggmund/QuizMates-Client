import React from "react";
import Container from "@mui/material/Container";
import { AppBar, StudentCard } from "../../components";

type Props = {};

const Student = (props: Props) => {
  return (
    <Container maxWidth="lg">
      <AppBar />
      <StudentCard />
    </Container>
  );
};

export default Student;
