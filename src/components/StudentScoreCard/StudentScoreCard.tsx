import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { getFullName } from "../../utils";
import { useGetStudentByIdQuery } from "../../redux";
import { ResourceNotFoundException } from "../../exceptions";
import { STUDENT_NOT_FOUND_BY_ID } from "../../model";

type StudentScoreCardProps = {
  studentId: number;
  score: number;
};
const StudentScoreCard = ({ studentId, score = 0 }: StudentScoreCardProps) => {
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

  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body1" color="primary">
        {getFullName(student)}
      </Typography>
      <Typography variant="body1" color="secondary">
        {score}
      </Typography>
    </Stack>
  );
};

export default StudentScoreCard;
