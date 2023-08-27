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
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";
import { getFullName, getGroupNameOrUnknown } from "../../utils";
import { useGetGroupByIdQuery, useGetStudentByIdQuery } from "../../redux";
import { GROUP_NOT_FOUND_BY_ID, STUDENT_NOT_FOUND_BY_ID } from "../../model";
import { ResourceNotFoundException } from "../../exceptions";

type StudentsTableGroupCellProps = {
  groupId: number;
};
const StudentsTableGroupCell = ({ groupId }: StudentsTableGroupCellProps) => {
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
    <TableCell align="left">
      {group ? (
        <Link to={`${Endpoints.groupPage}/${group.id}`}>{group.name}</Link>
      ) : (
        getGroupNameOrUnknown(group)
      )}
    </TableCell>
  );
};

type StudentsTableStudentRecordProps = {
  studentId: number;
};
const StudentsTableStudentRecord = ({
  studentId,
}: StudentsTableStudentRecordProps) => {
  const {
    data: student,
    isSuccess,
    isError,
    error,
  } = useGetStudentByIdQuery(studentId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(STUDENT_NOT_FOUND_BY_ID(studentId));

    return <CircularProgress />;
  }
  console.log("StudentsTableStudentRecord");
  console.log(student);
  return (
    <TableRow
      hover
      key={student.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{student.id}</TableCell>
      <TableCell component="th" scope="row">
        <Link to={`${Endpoints.studentPage}/${student.id}`}>
          {getFullName(student)}
        </Link>
      </TableCell>
      <StudentsTableGroupCell groupId={student.groupId} />
    </TableRow>
  );
};

type StudentsTableProps = {
  studentsIds: number[];
};
const StudentsTable = ({ studentsIds }: StudentsTableProps) => {
  const studentsRowHeaders = (
    <TableRow>
      <TableCell align="left">Student ID</TableCell>
      <TableCell align="left">Full name</TableCell>
      <TableCell align="left">Group</TableCell>
    </TableRow>
  );

  const studentsRows = studentsIds.map((studentId) => (
    <StudentsTableStudentRecord studentId={studentId} />
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
