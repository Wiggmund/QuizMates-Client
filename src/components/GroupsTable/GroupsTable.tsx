import React from "react";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ALL_STUDENTS_FETCH_ERROR, StudentsMap } from "../../model/Student";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";
import { useGetAllGroupsQuery, useGetAllStudentsQuery } from "../../redux";
import { ALL_GROUPS_FETCH_ERROR } from "../../model";
import { ResourceNotFoundException } from "../../exceptions";
import { getFullName } from "../../utils";

type GroupsTableProps = {};
const GroupsTable = (props: GroupsTableProps) => {
  const {
    data: students,
    isSuccess: isSuccessStudent,
    isError: isErrorStudent,
    error: errorStudent,
  } = useGetAllStudentsQuery("");
  const {
    data: groups,
    isSuccess: isSuccessGroup,
    isError: isErrorGroup,
    error: errorGroup,
  } = useGetAllGroupsQuery("");

  if (!isSuccessStudent || !isSuccessGroup) {
    if (isErrorStudent)
      throw new ResourceNotFoundException(ALL_STUDENTS_FETCH_ERROR());
    if (isErrorGroup)
      throw new ResourceNotFoundException(ALL_GROUPS_FETCH_ERROR());

    return <CircularProgress />;
  }

  const studentsMap: StudentsMap = {};
  students.forEach((st) => {
    studentsMap[st.id] = st;
  });

  const groupsRowsHeaders = (
    <TableRow>
      <TableCell align="left">Group ID</TableCell>
      <TableCell align="left">Name</TableCell>
      <TableCell align="left">Team Lead</TableCell>
      <TableCell align="left">Students amount</TableCell>
    </TableRow>
  );

  const groupsRows = groups.map((group) => {
    const teamLead = studentsMap[group.teamleadId];
    return (
      <TableRow
        hover
        key={group.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="left">{group.id}</TableCell>
        <TableCell component="th" scope="row">
          <Link to={`${Endpoints.groupPage}/${group.id}`}>{group.name}</Link>
        </TableCell>
        <TableCell align="left">
          {teamLead ? (
            <Link to={`${Endpoints.studentPage}/${teamLead.id}`}>
              {getFullName(teamLead)}
            </Link>
          ) : (
            getFullName(teamLead)
          )}
        </TableCell>
        <TableCell align="left">{group.studentsAmount}</TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>{groupsRowsHeaders}</TableHead>
        <TableBody>{groupsRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupsTable;
