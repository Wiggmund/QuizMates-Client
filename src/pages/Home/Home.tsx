import React from "react";
import Container from "@mui/material/Container";
import {
  AppBar,
  GroupsTable,
  HostsTable,
  StudentsTable,
} from "../../components";
import { Box, Grid, Typography, styled } from "@mui/material";
import { groupSource, hostsSource, studentsSource } from "../../data";

const SimpleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

type Props = {};

const Home = (props: Props) => {
  const studentsAmount = studentsSource.length;
  const groupsAmount = groupSource.length;
  const hostsAmount = hostsSource.length;

  return (
    <Container maxWidth="lg">
      <Grid container rowGap={4}>
        <Grid xs={12}>
          <AppBar />
        </Grid>
        <Grid xs={12}>
          <SimpleContainer>
            <Typography variant="h3" color="primary" mb={2}>
              Hosts
            </Typography>
            <Typography variant="h6" color="initial">
              {hostsAmount}
            </Typography>
          </SimpleContainer>
          <HostsTable />
        </Grid>
        <Grid xs={12}>
          <SimpleContainer>
            <Typography variant="h3" color="primary" mb={2}>
              Groups
            </Typography>
            <Typography variant="h6" color="initial">
              {groupsAmount}
            </Typography>
          </SimpleContainer>
          <GroupsTable />
        </Grid>
        <Grid xs={12}>
          <SimpleContainer>
            <Typography variant="h3" color="primary" mb={2}>
              Students
            </Typography>
            <Typography variant="h6" color="initial">
              {studentsAmount}
            </Typography>
          </SimpleContainer>
          <StudentsTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
