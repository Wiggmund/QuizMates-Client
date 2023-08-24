import { Stack, Chip, Typography, Paper } from "@mui/material";
import React from "react";
import { fetchStudentById } from "../../data";
import { getFullName } from "../../utils";

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
  const student = fetchStudentById(studentId);
  if (!student) throw new Error("Student not Found with id " + studentId);
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
