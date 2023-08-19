import React from "react";
import { groupSource } from "../../data";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type Props = {};

const GroupsTable = (props: Props) => {
  const groups = groupSource.slice();

  const groupsRowsHeaders = (
    <TableRow>
      <TableCell align="left">Group ID</TableCell>
      <TableCell align="left">Group name</TableCell>
    </TableRow>
  );

  const groupsRows = groups.map((group) => (
    <TableRow
      hover
      key={group.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{group.id}</TableCell>
      <TableCell component="th" scope="row">
        {group.name}
      </TableCell>
    </TableRow>
  ));

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
