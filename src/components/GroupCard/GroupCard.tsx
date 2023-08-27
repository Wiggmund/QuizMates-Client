import React from "react";
import {
  GROUP_STUDENTS_FETCH_ERROR,
  Group,
  STUDENT_NOT_FOUND_BY_ID,
} from "../../model";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { getFullName } from "../../utils";
import StudentsTable from "../StudentsTable/StudentsTable";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";
import {
  useGetAllGroupStudentsQuery,
  useGetStudentByIdQuery,
} from "../../redux";
import { ResourceNotFoundException } from "../../exceptions";

type GroupTeamleadBlockProps = {
  teamLeadId: number;
};
const GroupTeamleadBlockProps = ({ teamLeadId }: GroupTeamleadBlockProps) => {
  const {
    data: teamLead,
    isSuccess,
    isError,
    error,
  } = useGetStudentByIdQuery(teamLeadId);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(STUDENT_NOT_FOUND_BY_ID(teamLeadId));

    return <CircularProgress />;
  }

  return (
    <Stack alignItems="center">
      <Typography variant="caption" color="initial">
        TeamLead
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
        {teamLead ? (
          <Link to={`${Endpoints.studentPage}/${teamLead.id}`}>
            {getFullName(teamLead)}
          </Link>
        ) : (
          getFullName(teamLead)
        )}
      </Typography>
    </Stack>
  );
};

type Props = {
  group: Group;
};

const GroupCard = ({ group }: Props) => {
  const {
    data: groupStudents,
    isSuccess,
    isError,
    error,
  } = useGetAllGroupStudentsQuery(group.id);

  if (!isSuccess) {
    if (isError)
      throw new ResourceNotFoundException(GROUP_STUDENTS_FETCH_ERROR(group.id));

    return <CircularProgress />;
  }

  const studentsIds = groupStudents.map((st) => st.id);

  const infoBlock = (
    <Stack
      spacing={4}
      direction="row"
      justifyContent="space-around"
      sx={{ py: 4 }}
    >
      <GroupTeamleadBlockProps teamLeadId={group.id} />
      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          Students in group
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
          {groupStudents.length}
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
      <StudentsTable studentsIds={studentsIds} />
    </Stack>
  );
};

export default GroupCard;
