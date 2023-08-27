import React from "react";
import Container from "@mui/material/Container";
import { AppBar, HostCard } from "../../components";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { useGetHostByIdQuery } from "../../redux";
import { HOST_NOT_FOUND_BY_ID } from "../../model";
import { ResourceNotFoundException } from "../../exceptions";

type HostUrlParams = {
  hostId: string;
};

type HostProps = {};
const Host = (props: HostProps) => {
  const hostId = Number.parseInt(useParams<HostUrlParams>().hostId as string);

  const { data: host, isSuccess, isError, error } = useGetHostByIdQuery(hostId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(HOST_NOT_FOUND_BY_ID(hostId));

    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      <AppBar />
      <HostCard host={host} />
    </Container>
  );
};

export default Host;
