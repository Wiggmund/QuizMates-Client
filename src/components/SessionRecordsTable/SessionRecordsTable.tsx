import React from "react";
import {
  PAIR_NOT_FOUND_BY_ID,
  SESSION_RECS_FETCH_BY_STUDENT_ERROR,
  STUDENT_NOT_FOUND_BY_ID,
} from "../../model";
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
import { Endpoints } from "../../constants";
import { getFullName } from "../../utils";
import { Link } from "react-router-dom";
import {
  useGetAllSessionRecordsByStudentIdQuery,
  useGetPairByIdQuery,
  useGetStudentByIdQuery,
} from "../../redux";
import { ResourceNotFoundException } from "../../exceptions";

type SessionRecordsTableOpponentCellProps = {
  opponentId: number;
};
const SessionRecordsTableOpponentCell = ({
  opponentId,
}: SessionRecordsTableOpponentCellProps) => {
  const {
    data: opponent,
    isSuccess,
    isError,
    error,
  } = useGetStudentByIdQuery(opponentId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(STUDENT_NOT_FOUND_BY_ID(opponentId));

    return null;
  }

  return (
    <TableCell align="left">
      {opponent ? (
        <Link to={`${Endpoints.studentPage}/${opponent.id}`}>
          {getFullName(opponent)}
        </Link>
      ) : (
        getFullName(opponent)
      )}
    </TableCell>
  );
};

type SessionRecordsTablePairCellProps = {
  pairId: number;
  currentStudentId: number;
};
const SessionRecordsTablePairCell = ({
  pairId,
  currentStudentId,
}: SessionRecordsTablePairCellProps) => {
  const { data: pair, isSuccess, isError, error } = useGetPairByIdQuery(pairId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(PAIR_NOT_FOUND_BY_ID(pairId));

    return null;
  }

  if (pair.studentA === currentStudentId) {
    return <SessionRecordsTableOpponentCell opponentId={pair.studentB} />;
  }

  return <SessionRecordsTableOpponentCell opponentId={pair.studentA} />;
};

type SessionRecordsTableProps = {
  studentId: number;
};
const SessionRecordsTable = ({ studentId }: SessionRecordsTableProps) => {
  const {
    data: studentSessionRecords,
    isSuccess,
    isError,
    error,
  } = useGetAllSessionRecordsByStudentIdQuery(studentId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(
        SESSION_RECS_FETCH_BY_STUDENT_ERROR(studentId)
      );

    return <CircularProgress />;
  }

  const sessionRecordsRowsHeaders = (
    <TableRow>
      <TableCell align="left">№</TableCell>
      <TableCell align="left">Action</TableCell>
      <TableCell align="left">Opponent</TableCell>
      <TableCell align="left">Question</TableCell>
      <TableCell align="left">Score</TableCell>
    </TableRow>
  );

  const sessionRecordsRows = studentSessionRecords.map((record, index) => {
    return (
      <TableRow
        hover
        key={record.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="left">{record.action}</TableCell>
        <SessionRecordsTablePairCell
          pairId={record.pairId}
          currentStudentId={record.studentId}
        />
        <TableCell align="left">
          {record.question ? record.question : ""}
        </TableCell>
        <TableCell align="left">{record.score}</TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>{sessionRecordsRowsHeaders}</TableHead>
        <TableBody>{sessionRecordsRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default SessionRecordsTable;
