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
import { Endpoints } from "../../constants";
import { Link } from "react-router-dom";
import {
  useGetHostByIdQuery,
  useGetHostBySessionIdQuery,
  useGetSessionByIdQuery,
} from "../../redux";
import { getFullName } from "../../utils";
import { ResourceNotFoundException } from "../../exceptions";
import { HOST_NOT_FOUND_BY_ID, SESSION_NOT_FOUND_BY_ID } from "../../model";
import { HOST_NOT_FOUND_BY_SESSION } from "../../model/Host";

type SessionTableHostCellsProps = {
  hostId: number;
};
const SessionTableHostCell = ({ hostId }: SessionTableHostCellsProps) => {
  const { data: host, isSuccess, isError, error } = useGetHostByIdQuery(hostId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(HOST_NOT_FOUND_BY_ID(hostId));

    return <CircularProgress />;
  }

  return (
    <TableCell align="left">
      {host ? (
        <Link to={`${Endpoints.hostPage}/${host.id}`}>{getFullName(host)}</Link>
      ) : (
        getFullName(host)
      )}
    </TableCell>
  );
};

type SessionTableRecordProps = {
  sessionId: number;
};
const SessionTableRecord = ({ sessionId }: SessionTableRecordProps) => {
  const {
    data: session,
    isSuccess,
    isError,
    error,
  } = useGetSessionByIdQuery(sessionId);

  const {
    data: host,
    isSuccess: isSuccessHost,
    isError: isErrorHost,
    error: errorHost,
  } = useGetHostBySessionIdQuery(sessionId);

  if (!isSuccess || !isSuccessHost) {
    if (isError)
      throw new ResourceNotFoundException(SESSION_NOT_FOUND_BY_ID(sessionId));

    if (isErrorHost) {
      throw new ResourceNotFoundException(HOST_NOT_FOUND_BY_SESSION(sessionId));
    }

    return <CircularProgress />;
  }

  const formattedDate = session.date ? `${session.date}` : "unknown";
  return (
    <TableRow
      hover
      key={session.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{session.status}</TableCell>
      <TableCell align="left">{session.id}</TableCell>
      <TableCell component="th" scope="row">
        <Link to={`${Endpoints.sessionsPage}/${session.id}`}>
          {session.title}
        </Link>
      </TableCell>
      <SessionTableHostCell hostId={host.id} />
      <TableCell align="left">{formattedDate}</TableCell>
    </TableRow>
  );
};

type SessionsTableProps = {
  sessionsIds: number[];
};
const SessionsTable = ({ sessionsIds }: SessionsTableProps) => {
  const sessionsRowHeaders = (
    <TableRow>
      <TableCell align="left">Status</TableCell>
      <TableCell align="left">Session ID</TableCell>
      <TableCell align="left">Title</TableCell>
      <TableCell align="left">Host</TableCell>
      <TableCell align="left">Date</TableCell>
    </TableRow>
  );

  const sessionsRows = sessionsIds.map((sessionId) => (
    <SessionTableRecord sessionId={sessionId} key={sessionId} />
  ));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>{sessionsRowHeaders}</TableHead>
        <TableBody>{sessionsRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default SessionsTable;
