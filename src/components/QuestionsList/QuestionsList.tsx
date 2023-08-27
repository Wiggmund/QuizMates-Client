import {
  Stack,
  Chip,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { getFullName } from "../../utils";
import { ResourceNotFoundException } from "../../exceptions";
import { STUDENT_NOT_FOUND_BY_ID } from "../../model";
import { useGetStudentByIdQuery } from "../../redux";

type QuestionsListProps = {
  studentId: number;
  counter: number;
  questionLimit: number;
};
const QuestionsList = ({
  studentId,
  counter,
  questionLimit,
}: QuestionsListProps) => {
  const {
    data: student,
    isSuccess: isSuccessStudent,
    isError: isErrorStudent,
    error: errorStudent,
  } = useGetStudentByIdQuery(studentId);

  if (!isSuccessStudent) {
    if (isErrorStudent)
      throw new ResourceNotFoundException(STUDENT_NOT_FOUND_BY_ID(studentId));

    return <CircularProgress />;
  }

  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Chip
          variant="filled"
          color="secondary"
          label={getFullName(student)}
          sx={{
            px: 6,
            py: 2,
            fontSize: "1.5em",
            borderRadius: "5px",
          }}
        />
        <Typography variant="subtitle1" color="initial">
          Questions ({counter}/{questionLimit})
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Paper sx={{ py: 2, px: 1 }}>
          <Typography variant="body1" color="initial">
            Question #{counter}
          </Typography>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default QuestionsList;
