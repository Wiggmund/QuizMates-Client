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
import { Link, useNavigate } from "react-router-dom";

type Props = {};
const CreateSession = (props: Props) => {
  const { defaultValues, fieldsInfo } = getSessionCreateFormData();
  const navigate = useNavigate();
  const submitHandler = (data: CreateSessionFormData) => {
    dispatch(
      adjustSessionConfig({
        title: data.title,
        description: data.description,
      })
    );
    navigate(Endpoints.sessionConfiguration);
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
    </Container>
  );
};

export default CreateSession;
