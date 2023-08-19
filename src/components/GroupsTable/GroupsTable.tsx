import React from "react";
import { groupSource, studentsSource } from "../../data";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { StudentsMap } from "../../model/Student";

type Props = {};

const GroupsTable = (props: Props) => {
  const groups = groupSource.slice();
  const students = studentsSource.slice();
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
    const teamLead = studentsMap[group.teamLead];
    const fullName = teamLead
      ? `${teamLead.firstName} ${teamLead.lastName}`
      : "unknown";

    return (
      <TableRow
        hover
        key={group.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="left">{group.id}</TableCell>
        <TableCell component="th" scope="row">
          {group.name}
        </TableCell>
        <TableCell align="left">{fullName}</TableCell>
        <TableCell align="left">{group.studentsCount}</TableCell>
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
