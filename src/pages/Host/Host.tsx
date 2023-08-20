import React from "react";
import Container from "@mui/material/Container";
import { AppBar, HostCard } from "../../components";
import { useParams } from "react-router-dom";
import { fetchHostById } from "../../data";
import { Typography } from "@mui/material";

type HostUrlParams = {
  hostId: string;
};

type Props = {};

const Host = (props: Props) => {
  const hostId = Number.parseInt(useParams<HostUrlParams>().hostId as string);
  const host = fetchHostById(hostId);

  if (!host) {
    return (
      <Typography variant="h1" color="error">
        Host with {hostId} NOT FOUND
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <AppBar />
      <HostCard host={host} />
    </Container>
  );
};

export default Host;
