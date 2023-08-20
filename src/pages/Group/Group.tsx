import React from "react";
import Container from "@mui/material/Container";
import { AppBar, GroupCard } from "../../components";
import { useParams } from "react-router-dom";
import { fetchGroupById } from "../../data";
import { Typography } from "@mui/material";

type GroupUrlParams = {
  groupId: string;
};

type Props = {};

const Group = (props: Props) => {
  const groupId = Number.parseInt(
    useParams<GroupUrlParams>().groupId as string
  );
  const group = fetchGroupById(groupId);

  if (!group) {
    return (
      <Typography variant="h1" color="error">
        Group with {groupId} NOT FOUND
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <AppBar />
      <GroupCard group={group} />
    </Container>
  );
};

export default Group;
