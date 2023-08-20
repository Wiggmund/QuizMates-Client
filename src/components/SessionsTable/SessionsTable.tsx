import React from "react";
import {
  fetchAllHosts,
  fetchHostById,
  hostsSource,
  sessionsSource,
} from "../../data";
import {
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
import { Session } from "../../model";

type Props = {
  sessions: Session[];
};

const SessionsTable = ({ sessions }: Props) => {
  const hosts = fetchAllHosts();

  const sessionsRowHeaders = (
    <TableRow>
      <TableCell align="left">Status</TableCell>
      <TableCell align="left">Session ID</TableCell>
      <TableCell align="left">Title</TableCell>
      <TableCell align="left">Host</TableCell>
      <TableCell align="left">Date</TableCell>
    </TableRow>
  );

  const sessionsRows = sessions.map((session) => {
    const host = fetchHostById(session.host);
    const hostFullName = host
      ? `${host.firstName} ${host.lastName}`
      : "unknown";
    const formattedDate = session.date
      ? session.date.toLocaleDateString()
      : "unknown";

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
        <TableCell align="left">
          {host && (
            <Link to={`${Endpoints.hostPage}/${host.id}`}>{hostFullName}</Link>
          )}
          {host === undefined && "unknown"}
        </TableCell>
        <TableCell align="left">{formattedDate}</TableCell>
      </TableRow>
    );
  });

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
