import React from "react";
import {
  fetchStudentById,
  fetchStudentsByGroup,
  fetchStudentsWithGroupByGroupId,
} from "../../data";
import { Group } from "../../model";
import { Stack, Typography } from "@mui/material";
import { getFullName } from "../../utils";
import StudentsTable from "../StudentsTable/StudentsTable";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";

type Props = {
  group: Group;
};

const GroupCard = ({ group }: Props) => {
  const students = fetchStudentsWithGroupByGroupId(group.id);
  const teamLead = fetchStudentById(group.teamLead);
  const teamLeadFullName = teamLead ? getFullName(teamLead) : "unknown";

  const infoBlock = (
    <Stack
      spacing={4}
      direction="row"
      justifyContent="space-around"
      sx={{ py: 4 }}
    >
      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          TeamLead
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
          {teamLead && (
            <Link to={`${Endpoints.studentPage}/${teamLead.id}`}>
              {teamLeadFullName}
            </Link>
          )}
          {teamLead === undefined && teamLeadFullName}
        </Typography>
      </Stack>

      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          Students in group
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
          {students.length}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Stack>
      <Typography variant="h1" color="initial">
        {group.name}
      </Typography>
      {infoBlock}
      <Typography variant="subtitle1" color="initial">
        Students list
      </Typography>
      <StudentsTable students={students} />
    </Stack>
  );
};

export default GroupCard;
