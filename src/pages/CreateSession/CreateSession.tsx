import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Form } from "../../components";
import { v4 as uuidv4 } from "uuid";
import {
  CreateSessionFormData,
  Endpoints,
  getSessionCreateFormData,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createQuiz } from "../../redux/features";
import {
  adjustSessionConfig,
  selectQuizById,
  setCurrentQuiz,
} from "../../redux/features/quizes/quizesSlice";
import { Quiz } from "../../model";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { addSession } from "../../data";
import { Link } from "react-router-dom";

type Props = {};
const CreateSession = (props: Props) => {
  const [nextStepAllowed, setNextStepAllowed] = useState(false);
  const { defaultValues, fieldsInfo } = getSessionCreateFormData();
  const submitHandler = (data: CreateSessionFormData) => {
    dispatch(
      adjustSessionConfig({
        title: data.title,
        description: data.description,
      })
    );
    setNextStepAllowed(true);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = uuidv4();

    dispatch(
      createQuiz({
        id,
        status: "active",
        hosts: [],
        groups: [],
        absentStudents: [],
        presentStudents: [],
        records: [],
      })
    );

    dispatch(setCurrentQuiz(id));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {nextStepAllowed ? (
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h3" color="secondary">
            Session created succsessfully. You can move on
          </Typography>
          <Link to={`${Endpoints.sessionConfiguration}`}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{ px: 8 }}
            >
              Next
            </Button>
          </Link>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Typography variant="h1" color="secondary" textAlign="center">
            Create your Session
          </Typography>
          <Form
            fieldsDefaultValues={defaultValues}
            formFields={fieldsInfo}
            submitBtnTitle="Create"
            submitHandler={submitHandler}
          />
        </Stack>
      )}
    </Container>
  );
};

export default CreateSession;
