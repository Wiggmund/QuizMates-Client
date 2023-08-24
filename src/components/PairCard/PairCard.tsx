import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Theme } from "@emotion/react";
import { SxProps, Paper, Stack, Grid, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { fetchStudentById } from "../../data";
import { getFullName } from "../../utils";

type PairCardProps = {
  studentId: number;
  opponentId: number;
  current: boolean;
  passed: boolean;
};
const PairCard = ({
  studentId,
  opponentId,
  current,
  passed,
}: PairCardProps) => {
  const student = fetchStudentById(studentId);
  const opponent = fetchStudentById(opponentId);

  if (!student || !opponent) return <h1>NOT FOUND</h1>;

  const styles: SxProps<Theme> = current
    ? { bgcolor: blue[500], color: "white" }
    : passed
    ? { bgcolor: red[500], color: "white" }
    : {};

  return (
    <Paper sx={{ py: 2, px: 2, ...styles }}>
      <Stack>
        <Grid container columnSpacing={1} alignItems="center">
          <Grid xs={5}>
            <Stack direction="row" spacing={0.5} justifyContent="center">
              <PersonIcon />
              <Typography
                variant="body1"
                color={current || passed ? "white" : "primary"}
              >
                {getFullName(student)}
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={2}>
            <Typography
              variant="body1"
              color={current || passed ? "white" : "initial"}
              textAlign={"center"}
            >
              VS
            </Typography>
          </Grid>
          <Grid xs={5}>
            <Stack direction="row" spacing={0.5} justifyContent="center">
              <PersonIcon />
              <Typography
                variant="body1"
                color={current || passed ? "white" : "primary"}
              >
                {getFullName(opponent)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default PairCard;
