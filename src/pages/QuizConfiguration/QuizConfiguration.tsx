import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  Container,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFullName } from "../../utils";
import {
  ALL_GROUPS_FETCH_ERROR,
  ALL_STUDENTS_FETCH_ERROR,
  Group,
  Host,
  SessionStatus,
  Student,
} from "../../model";
import { AppBar } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addAbsentStudents,
  addGroups,
  addHosts,
  addPresentStudents,
} from "../../redux/features";
import { Link } from "react-router-dom";
import {
  selectQuizById,
  setCurrentSession,
} from "../../redux/features/quizes/quizesSlice";
import { Endpoints } from "../../constants";
import {
  useCreateSessionMutation,
  useGetAllGroupsQuery,
  useGetAllHostsQuery,
  useGetAllStudentsQuery,
  useUpdateSessionMutation,
} from "../../redux";
import { ALL_HOSTS_FETCH_ERROR } from "../../model/Host";
import { ResourceNotFoundException } from "../../exceptions";

type AbstractEntity = {
  id: number;
  firstName?: string;
  lastName?: string;
  name?: string;
};
type CheckboxListProps<T extends AbstractEntity> = {
  elements: T[];
  onSelectEntity?: (entity: T) => void;
  onDeselectEntity?: (entity: T) => void;
};
const CheckboxList = <T extends AbstractEntity>({
  elements,
  onSelectEntity = (e: T) => {},
  onDeselectEntity = (e: T) => {},
}: CheckboxListProps<T>) => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number, entity: T) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      onSelectEntity(entity);
      newChecked.push(value);
    } else {
      onDeselectEntity(entity);
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {elements.map((element) => {
        const labelId = `checkbox-list-label-${element.id}`;

        return (
          <ListItem key={element.id} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(element.id, element)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(element.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={element.name ? element.name : getFullName(element)}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

type Props = {};

const QuizConfiguration = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [absentStudents, setAbsentStudents] = useState<Student[]>([]);
  const dispatch = useAppDispatch();
  const currentQuizId = useAppSelector((state) => state.quizes.currentQuizId);
  const { title, description } = useAppSelector(
    (state) => state.quizes.sessionConfig
  );

  const [createSession] = useCreateSessionMutation();
  const [updateSession] = useUpdateSessionMutation();

  const {
    data: fetchedHosts,
    isSuccess: isSuccessHost,
    isError: isErrorHost,
    error: errorHost,
  } = useGetAllHostsQuery("");
  const {
    data: fetchedGroups,
    isSuccess: isSuccessGroup,
    isError: isErrorGroup,
    error: errorGroup,
  } = useGetAllGroupsQuery("");
  const {
    data: allFetchedStudents,
    isSuccess: isSuccessStudent,
    isError: isErrorStudent,
    error: errorStudent,
  } = useGetAllStudentsQuery("");

  if (!isSuccessStudent || !isSuccessGroup || !isSuccessHost) {
    if (isErrorHost)
      throw new ResourceNotFoundException(ALL_HOSTS_FETCH_ERROR());
    if (isErrorGroup)
      throw new ResourceNotFoundException(ALL_GROUPS_FETCH_ERROR());
    if (isErrorStudent)
      throw new ResourceNotFoundException(ALL_STUDENTS_FETCH_ERROR());

    return <CircularProgress />;
  }

  const addHost = (host: Host) => setHosts([...hosts, host]);
  const removeHost = (host: Host) =>
    setHosts(hosts.filter((item) => item.id !== host.id));

  const addGroup = (group: Group) => setGroups([...groups, group]);
  const removeGroup = (group: Group) =>
    setGroups(groups.filter((item) => item.id !== group.id));

  const addAbsentStudent = (student: Student) =>
    setAbsentStudents([...absentStudents, student]);
  const removeAbsentStudent = (student: Student) =>
    setAbsentStudents(absentStudents.filter((st) => st.id !== student.id));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setHosts([]);
    setGroups([]);
    setAbsentStudents([]);
    setActiveStep(0);
  };

  const isHostSelected = hosts.length > 0;
  const selectingHost = {
    label: "Host",
    description: "For each session must be Host",
    element: (
      <CheckboxList
        elements={fetchedHosts}
        onSelectEntity={addHost}
        onDeselectEntity={removeHost}
      />
    ),
    disabled: !isHostSelected,
    errorMessage: "Please select at least on host",
  };

  const isGroupsSelected = groups.length > 0;
  const selectingGroups = {
    label: "Groups",
    description: "Select groups who will take part in Quiz",
    element: (
      <CheckboxList
        elements={fetchedGroups}
        onSelectEntity={addGroup}
        onDeselectEntity={removeGroup}
      />
    ),
    disabled: !isGroupsSelected,
    errorMessage: "Please selecte at least one group",
  };

  const fetchedStudents = allFetchedStudents.filter((st) =>
    fetchedGroups.find((g) => g.id === st.groupId)
  );
  const selectingStudents = {
    label: "Absent students",
    description: "Select students who is absent and can't take part in Quiz",
    element: (
      <CheckboxList
        elements={fetchedStudents}
        onSelectEntity={addAbsentStudent}
        onDeselectEntity={removeAbsentStudent}
      />
    ),
    disabled: false,
    errorMessage: "",
  };

  const hostsList = (
    <List
      dense={true}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {hosts.map((host) => (
        <ListItem key={host.id} disableGutters>
          <ListItemText primary={getFullName(host)} />
        </ListItem>
      ))}
    </List>
  );
  const groupsList = (
    <List
      dense={true}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {groups.map((group) => (
        <ListItem key={group.id} disableGutters>
          <ListItemText primary={group.name} />
        </ListItem>
      ))}
    </List>
  );
  const absentStudentsList = (
    <List
      dense={true}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {absentStudents.map((student) => (
        <ListItem key={student.id} disableGutters>
          <ListItemText primary={getFullName(student)} />
        </ListItem>
      ))}
    </List>
  );

  const presentStudents = fetchedStudents.filter(
    (present) => !absentStudents.find((absent) => absent.id === present.id)
  );
  const presentStudentsList = (
    <List
      dense={true}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {presentStudents.map((student) => (
        <ListItem key={student.id} disableGutters>
          <ListItemText primary={getFullName(student)} />
        </ListItem>
      ))}
    </List>
  );

  const steps = [selectingHost, selectingGroups, selectingStudents];

  const handleConfiguration = async () => {
    dispatch(addHosts({ quizId: currentQuizId, data: hosts }));
    dispatch(addGroups({ quizId: currentQuizId, data: groups }));
    dispatch(
      addAbsentStudents({ quizId: currentQuizId, data: absentStudents })
    );
    dispatch(
      addPresentStudents({ quizId: currentQuizId, data: presentStudents })
    );

    const currentSessionId = await createSession({
      title,
      description,
      host: hosts[0].id,
      date: new Date(),
      status: SessionStatus.CREATED,
    }).unwrap();

    dispatch(setCurrentSession(currentSessionId));

    // await updateSession({
    //   ...currentSession,
    //   status: SessionStatus.STARTED
    // });
  };

  return (
    <Container maxWidth="lg">
      <AppBar />
      <Stack alignItems="center" sx={{ py: 4 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                {step.disabled && (
                  <Typography variant="caption" color="error">
                    {step.errorMessage}
                  </Typography>
                )}
                {step.element}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={step.disabled}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography variant="h6" color="initial">
              You are ready to start the Quiz
            </Typography>

            <Typography variant="body1" color="initial">
              Hosts:
            </Typography>
            {hostsList}
            <Typography variant="body1" color="initial">
              Groups:
            </Typography>
            {groups.length === 1 && (
              <Typography variant="caption" color="error">
                Pairs will be created whithin only one group
              </Typography>
            )}
            {groupsList}

            <Stack direction="row" justifyContent="center" spacing={4}>
              <Stack>
                {absentStudents.length > 0 && (
                  <>
                    <Typography variant="body1" color="initial">
                      Absent students:
                    </Typography>
                    {absentStudentsList}
                  </>
                )}
              </Stack>
              <Stack>
                <Typography variant="body1" color="initial">
                  Present students:
                </Typography>
                {presentStudentsList}
              </Stack>
            </Stack>

            <Stack alignItems="center" spacing={4}>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
              <Link to={`${Endpoints.sessionQuiz}`}>
                <Button
                  variant="contained"
                  sx={{ mt: 1, mr: 1 }}
                  onClick={handleConfiguration}
                >
                  Start Quiz
                </Button>
              </Link>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default QuizConfiguration;
