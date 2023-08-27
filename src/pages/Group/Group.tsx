import React from "react";
import Container from "@mui/material/Container";
import { AppBar, GroupCard } from "../../components";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { useGetGroupByIdQuery } from "../../redux";
import { GROUP_NOT_FOUND_BY_ID } from "../../model";
import { ResourceNotFoundException } from "../../exceptions";

type GroupUrlParams = {
  groupId: string;
};

type GroupProps = {};
const Group = (props: GroupProps) => {
  const groupId = Number.parseInt(
    useParams<GroupUrlParams>().groupId as string
  );

  const {
    data: group,
    isSuccess,
    isError,
    error,
  } = useGetGroupByIdQuery(groupId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(GROUP_NOT_FOUND_BY_ID(groupId));

    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      <AppBar />
      <GroupCard group={group} />
    </Container>
  );
};

export default Group;
