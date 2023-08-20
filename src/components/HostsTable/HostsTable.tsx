import React from "react";
import { fetchAllHosts, hostsSource } from "../../data";
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
import { getFullName } from "../../utils";

type Props = {};

const HostsTable = (props: Props) => {
  const hosts = fetchAllHosts();

  const hostsRowsHeaders = (
    <TableRow>
      <TableCell align="left">Host ID</TableCell>
      <TableCell align="left">Full Name</TableCell>
    </TableRow>
  );

  const hostsRows = hosts.map((host) => (
    <TableRow
      hover
      key={host.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{host.id}</TableCell>
      <TableCell component="th" scope="row">
        <Link to={`${Endpoints.hostPage}/${host.id}`}>{getFullName(host)}</Link>
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>{hostsRowsHeaders}</TableHead>
        <TableBody>{hostsRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default HostsTable;
