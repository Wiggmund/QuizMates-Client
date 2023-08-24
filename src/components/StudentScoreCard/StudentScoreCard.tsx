import { Stack, Typography } from "@mui/material";
import React from "react";
import { fetchStudentById } from "../../data";
import { getFullName } from "../../utils";

type StudentScoreCardProps = {
  studentId: number;
  score: number;
};
const StudentScoreCard = ({ studentId, score = 0 }: StudentScoreCardProps) => {
  const student = fetchStudentById(studentId);

  if (!student) throw new Error("Student not found with id " + studentId);

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
