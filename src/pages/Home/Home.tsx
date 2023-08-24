import React from "react";
import Container from "@mui/material/Container";
import {
  AppBar,
  GroupsTable,
  HostsTable,
  StudentsTable,
} from "../../components";
import { Box, Grid, Typography, styled, Button } from "@mui/material";
import {
  fetchStudentsWithGroup,
  groupSource,
  hostsSource,
  studentsSource,
} from "../../data";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";

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
  const studentsWithGroups = fetchStudentsWithGroup();

  return (
    <Container maxWidth="lg">
      <Grid container rowGap={4}>
        <Grid xs={12}>
          <AppBar />
        </Grid>
        <Grid xs={12}>
          <Link to={`${Endpoints.sessionCreate}`}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
            >
              Start Session
            </Button>
          </Link>
        </Grid>
        <Grid xs={12}>
          <SimpleContainer>
            <Typography variant="h3" color="primary" mb={2}>
              Hosts
            </Typography>
            <Typography variant="h4" color="primary">
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
            <Typography variant="h4" color="primary">
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
            <Typography variant="h4" color="primary">
              {studentsAmount}
            </Typography>
          </SimpleContainer>
          <StudentsTable students={studentsWithGroups} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
