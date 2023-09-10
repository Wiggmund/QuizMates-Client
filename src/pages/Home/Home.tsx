import React from "react";
import Container from "@mui/material/Container";
import {
  AppBar,
  GroupsTable,
  HostsTable,
  StudentsTable,
} from "../../components";
import {
  Box,
  Typography,
  styled,
  Button,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";
import {
  useGetAllGroupsQuery,
  useGetAllHostsQuery,
  useGetAllStudentsQuery,
} from "../../redux";
import { ALL_GROUPS_FETCH_ERROR, ALL_STUDENTS_FETCH_ERROR } from "../../model";
import { ALL_HOSTS_FETCH_ERROR } from "../../model/Host";
import { ResourceNotFoundException } from "../../exceptions";

const SimpleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

type Props = {};

const Home = (props: Props) => {
  const {
    data: hosts,
    isSuccess: isSuccessHost,
    isError: isErrorHost,
    error: errorHost,
  } = useGetAllHostsQuery("");
  const {
    data: groups,
    isSuccess: isSuccessGroup,
    isError: isErrorGroup,
    error: errorGroup,
  } = useGetAllGroupsQuery("");
  const {
    data: students,
    isSuccess: isSuccessStudent,
    isError: isErrorStudent,
    error: errorStudent,
  } = useGetAllStudentsQuery("");

  if (!isSuccessStudent || !isSuccessHost || !isSuccessGroup) {
    if (isErrorStudent)
      throw new ResourceNotFoundException(ALL_STUDENTS_FETCH_ERROR());
    if (isErrorGroup)
      throw new ResourceNotFoundException(ALL_GROUPS_FETCH_ERROR());
    if (isErrorHost)
      throw new ResourceNotFoundException(ALL_HOSTS_FETCH_ERROR());

    return <CircularProgress />;
  }

  const studentsAmount = students.length;
  const groupsAmount = groups.length;
  const hostsAmount = hosts.length;
  const studentsIds = students.map((student) => student.id);

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
          <StudentsTable studentsIds={studentsIds} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
