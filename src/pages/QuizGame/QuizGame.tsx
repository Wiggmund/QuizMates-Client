import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import { fetchPairs, fetchStudentById, fetchStudentsByIds } from "../../data";
import {
  Paper,
  Stack,
  Typography,
  Button,
  SxProps,
  Theme,
  TextField,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import PersonIcon from "@mui/icons-material/Person";
import { getFullName } from "../../utils";
import {
  CreateSessionRecordDto,
  Pair,
  SessionRecord,
  Student,
} from "../../model";
import { blue, red } from "@mui/material/colors";

// private Long sessionId;
// private Long pairId;
// private Long studentId;
// private Long hostId;
// private Double score;
// private String hostNotes;
// private Boolean wasPresent;

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
  const [passedPairs, setPassedPairs] = useState<number[]>([]);
  const [studentA, setStudentA] = useState<Student>();
  const [studentB, setStudentB] = useState<Student>();

  const pairs = fetchPairs([], []);
  const questionsPerSession = 3;
  const studentsIds = pairs.flatMap((pair) => [pair.student, pair.opponent]);
  const isQuizFinished = counter.current === pairs.length;

  const [sessionRecords, setSessionRecords] = useState<
    CreateSessionRecordDto[]
  >([]);

  const takeNextPair = () => {
    const pair = pairs[counter.current];
    setCurrentPair(pair);

    const studentA = fetchStudentById(pair.student);
    const studentB = fetchStudentById(pair.opponent);
    setStudentA(studentA);
    setStudentB(studentB);

    setPassedPairs((prev) => [...prev, pair.id]);
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
      addSessionRecords();
      return;
    }

    if (questionCounter === questionsPerSession) {
      setAsker("opponent");
      const prevAsker = currentAsker;
      setCurrentAsker(currentAnswerer);
      setCurrentAnswerer(prevAsker);

      if (studentA && studentB) {
        const prevStudentA = studentA;
        setStudentA(studentB);
        setStudentB(prevStudentA);
      }

      setQuestionCounter(1);
      addSessionRecords();
      return;
    }

    addSessionRecords();
    setQuestionCounter((prev) => prev + 1);
    function addSessionRecords() {
      if (currentAsker && currentAnswerer) {
        const recordStudentA: CreateSessionRecordDto = {
          sessionId: 1,
          hostId: 1,
          action: "ask",
          studentId: currentAsker,
          score,
          opponentId: currentAnswerer,
          wasPresent: true,
          hostNotes: "Some notes",
          question: "Some question",
        };
        const recordStudentB: CreateSessionRecordDto = {
          sessionId: 1,
          hostId: 1,
          action: "answer",
          studentId: currentAnswerer,
          score,
          opponentId: currentAsker,
          wasPresent: true,
          hostNotes: "Some notes",
          question: "Some question",
        };
        setSessionRecords((prev) => [...prev, recordStudentA, recordStudentB]);
      }
    }
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

  console.log(sessionRecords);
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
                passed={
                  passedPairs.find((item) => pair.id === item) !== undefined
                }
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
                      disabled={pairFinish}
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
                        Add to {studentA && getFullName(studentA)}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={addScoreToOpponent}
                        disabled={pairFinish}
                      >
                        Add to {studentB && getFullName(studentB)}
                      </Button>
                    </Stack>
                  </Stack>
                </>
              ) : (
                "Choose some pair"
              )}
            </Stack>
            <Stack flexGrow={1}>
              {isQuizFinished ? (
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={!pairFinish}
                >
                  Finish Quiz
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={takeNextPair}
                  disabled={isQuizFinished || !pairFinish}
                >
                  Next pair
                </Button>
              )}
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
