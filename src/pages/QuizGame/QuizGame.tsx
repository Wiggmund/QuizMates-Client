import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import { AppBar } from "../../components";
import { fetchPairs, fetchStudentById, fetchStudentsByIds } from "../../data";
import {
  Paper,
  Stack,
  Typography,
  Button,
  SxProps,
  Theme,
  ButtonGroup,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import PersonIcon from "@mui/icons-material/Person";
import { getFullName } from "../../utils";
import { Pair, Student } from "../../model";
import { blue } from "@mui/material/colors";

type PairCardProps = {
  studentId: number;
  opponentId: number;
  current: boolean;
};
const PairCard = ({ studentId, opponentId, current }: PairCardProps) => {
  const student = fetchStudentById(studentId);
  const opponent = fetchStudentById(opponentId);

  if (!student || !opponent) return <h1>NOT FOUND</h1>;

  const styles: SxProps<Theme> = current
    ? { bgcolor: blue[500], color: "white" }
    : {};

  return (
    <Paper sx={{ py: 2, px: 2, ...styles }}>
      <Stack>
        <Grid container columnSpacing={1} alignItems="center">
          <Grid xs={5}>
            <Stack direction="row" spacing={0.5} justifyContent="center">
              <PersonIcon />
              <Typography variant="body1" color={current ? "white" : "primary"}>
                {getFullName(student)}
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={2}>
            <Typography
              variant="body1"
              color={current ? "white" : "initial"}
              textAlign={"center"}
            >
              VS
            </Typography>
          </Grid>
          <Grid xs={5}>
            <Stack direction="row" spacing={0.5} justifyContent="center">
              <PersonIcon />
              <Typography variant="body1" color={current ? "white" : "primary"}>
                {getFullName(opponent)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

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
      <Typography variant="subtitle1" color="initial">
        {getFullName(student)} {counter}/{questionLimit}
      </Typography>
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

type Props = {};

type StudentsScores = {
  [key: number]: number;
};

const QuizGame = (props: Props) => {
  const counter = useRef(0);
  const studentsScores = useRef<StudentsScores>({});
  const [currentPair, setCurrentPair] = useState<Pair>();
  const [questionCounter, setQuestionCounter] = useState(1);
  const [asker, setAsker] = useState<"student" | "opponent">("student");
  const [pairFinish, setPairFinish] = useState(true);
  const [score, setScore] = useState(1);
  const [currentAsker, setCurrentAsker] = useState<number | undefined>(
    undefined
  );
  const [currentAnswerer, setCurrentAnswerer] = useState<number | undefined>(
    undefined
  );

  const pairs = fetchPairs([], []);
  const questionsPerSession = 3;
  const studentsIds = pairs.flatMap((pair) => [pair.student, pair.opponent]);

  const takeNextPair = () => {
    if (counter.current === pairs.length) counter.current = 0;
    const pair = pairs[counter.current];
    setCurrentPair(pair);
    setCurrentAsker(pair.student);
    setCurrentAnswerer(pair.opponent);
    setPairFinish(false);
    setQuestionCounter(1);
    setAsker("student");
    counter.current++;
  };

  const takeNextQuestion = () => {
    if (questionCounter === questionsPerSession && asker === "opponent") {
      setPairFinish(true);
      return;
    }

    if (questionCounter === questionsPerSession) {
      setAsker("opponent");
      const prevAsker = currentAsker;
      setCurrentAsker(currentAnswerer);
      setCurrentAnswerer(prevAsker);
      setQuestionCounter(1);
      return;
    }

    setQuestionCounter((prev) => prev + 1);
  };

  const changeScore = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value) {
      const floatPart = value.split(".")[1];
      const result =
        floatPart && floatPart.length > 0
          ? Number.parseFloat(e.target.value)
          : Number.parseInt(e.target.value);

      result > 0 ? setScore(result) : setScore(0);
    }
  };

  const addScoreItself = () => {
    if (currentPair && currentAsker) {
      const currentStudentId = currentAsker;
      const oldValue = studentsScores.current[currentStudentId] || 0;
      studentsScores.current[currentStudentId] = oldValue + score;
      takeNextQuestion();
    }
  };
  const addScoreToOpponent = () => {
    if (currentPair && currentAnswerer) {
      const currentStudentId = currentAnswerer;
      const oldValue = studentsScores.current[currentStudentId] || 0;
      studentsScores.current[currentStudentId] = oldValue + score;
      takeNextQuestion();
    }
  };

  console.log(studentsScores.current);

  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <h1>Quiz Game</h1>
      <Grid container height="100vh">
        <Grid xs={4} sx={{ px: 1 }}>
          <Stack spacing={2}>
            {pairs.map((pair) => (
              <PairCard
                studentId={pair.student}
                opponentId={pair.opponent}
                key={pair.id}
                current={pair.id === currentPair?.id}
              />
            ))}
          </Stack>
        </Grid>
        <Grid xs={6} sx={{ px: 1 }}>
          <Stack justifyContent="space-between" height="100vh">
            <Stack flexGrow={1} spacing={3}>
              {currentPair ? (
                <>
                  {asker === "student" ? (
                    <QuestionsList
                      studentId={currentPair.student}
                      counter={questionCounter}
                      questionLimit={questionsPerSession}
                    />
                  ) : (
                    <QuestionsList
                      studentId={currentPair.opponent}
                      counter={questionCounter}
                      questionLimit={questionsPerSession}
                    />
                  )}
                  <Stack alignItems="center" spacing={1}>
                    <TextField
                      size="small"
                      id="outlined-number"
                      label="Earned score"
                      type="number"
                      sx={{
                        minWidth: 20,
                        maxWidth: 100,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={changeScore}
                      value={score}
                    />
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={addScoreItself}
                        disabled={pairFinish}
                      >
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={addScoreToOpponent}
                        disabled={pairFinish}
                      >
                        Add to opponent
                      </Button>
                    </Stack>
                  </Stack>
                  {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={takeNextQuestion}
                    disabled={pairFinish}
                  >
                    {questionCounter === questionsPerSession
                      ? "Finish"
                      : "Next question"}
                  </Button> */}
                </>
              ) : (
                "Choose some pair"
              )}
            </Stack>
            <Stack flexGrow={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={takeNextPair}
                disabled={!pairFinish}
              >
                Next pair
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={2} sx={{ px: 1 }}>
          <h1>Stats</h1>
          {studentsIds.map((studentId) => (
            <StudentScoreCard
              studentId={studentId}
              score={studentsScores.current[studentId]}
              key={studentId}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuizGame;
