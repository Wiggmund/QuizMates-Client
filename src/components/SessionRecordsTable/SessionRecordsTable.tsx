import React from "react";
import { SessionRecord } from "../../model";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetchStudentById } from "../../data";
import { Endpoints } from "../../constants";
import { getFullName } from "../../utils";
import { Link } from "react-router-dom";

type Props = {
  sessionRecords: SessionRecord[];
};

const SessionRecordsTable = ({ sessionRecords }: Props) => {
  const sessionRecordsRowsHeaders = (
    <TableRow>
      <TableCell align="left">№</TableCell>
      <TableCell align="left">Action</TableCell>
      <TableCell align="left">Opponent</TableCell>
      <TableCell align="left">Question</TableCell>
      <TableCell align="left">Score</TableCell>
    </TableRow>
  );

  const sessionRecordsRows = sessionRecords.map((record, index) => {
    const oponent = fetchStudentById(record.opponentId);

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
        <TableCell align="left">
          {oponent && (
            <Link to={`${Endpoints.studentPage}/${oponent.id}`}>
              {getFullName(oponent)}
            </Link>
          )}
          {oponent === undefined && "unknown"}
        </TableCell>
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
