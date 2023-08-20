import React from "react";
import { studentsWithGroupsSource } from "../../data";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";
import { Student, StudentWithGroup } from "../../model";

type Props = {
  students: StudentWithGroup[];
};

const StudentsTable = ({ students }: Props) => {
  const studentsRowHeaders = (
    <TableRow>
      <TableCell align="left">Student ID</TableCell>
      <TableCell align="left">Full name</TableCell>
      <TableCell align="left">Group</TableCell>
    </TableRow>
  );

  const studentsRows = students.map((student) => (
    <TableRow
      hover
      key={student.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{student.id}</TableCell>
      <TableCell component="th" scope="row">
        <Link to={`${Endpoints.studentPage}/${student.id}`}>
          {`${student.firstName} ${student.lastName}`}
        </Link>
      </TableCell>
      <TableCell align="left">{student.group.name}</TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>{studentsRowHeaders}</TableHead>
        <TableBody>{studentsRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;
