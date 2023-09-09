import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  CreateSessionRecordDto,
  Group,
  Host,
  Pair,
  Quiz,
  Session,
  Student,
} from "../../../model";
import { QuizStatus } from "../../../model/Quiz";

const quizAdapter = createEntityAdapter<Quiz>();

type QuizPayload<T> = {
  quizId: string;
  data: T;
};

type SessionConfig = {
  title: string;
  description: string;
};

const quizesSlice = createSlice({
  name: "quizes",
  initialState: quizAdapter.getInitialState({
    currentQuizId: "",
    currentSession: {} as Session,
    sessionConfig: {
      title: "",
      description: "",
    },
    randomPairs: [] as Pair[],
  }),
  reducers: {
    adjustSessionConfig(state, action: PayloadAction<SessionConfig>) {
      state.sessionConfig.title = action.payload.title;
      state.sessionConfig.description = action.payload.description;
    },
    setCurrentQuiz(state, action: PayloadAction<string>) {
      state.currentQuizId = action.payload;
    },
    setCurrentSession(state, action: PayloadAction<Session>) {
      state.currentSession = action.payload;
    },
    createQuiz(state, action: PayloadAction<Quiz>) {
      quizAdapter.upsertOne(state, action.payload);
    },
    addHosts(state, action: PayloadAction<QuizPayload<Host[]>>) {
      const { quizId, data } = action.payload;
      const quiz = state.entities[quizId];

      if (quiz) {
        quiz.hosts = [...quiz.hosts, ...data];
      }
    },
    addGroups(state, action: PayloadAction<QuizPayload<Group[]>>) {
      const { quizId, data } = action.payload;
      const quiz = state.entities[quizId];

      if (quiz) {
        quiz.groups = [...quiz.groups, ...data];
      }
    },
    addAbsentStudents(state, action: PayloadAction<QuizPayload<Student[]>>) {
      const { quizId, data } = action.payload;
      const quiz = state.entities[quizId];

      if (quiz) {
        quiz.absentStudents = [...quiz.absentStudents, ...data];
      }
    },
    addPresentStudents(state, action: PayloadAction<QuizPayload<Student[]>>) {
      const { quizId, data } = action.payload;
      const quiz = state.entities[quizId];

      if (quiz) {
        quiz.presentStudents = [...quiz.presentStudents, ...data];
      }
    },
    addCreateSessionRecordDto(
      state,
      action: PayloadAction<QuizPayload<CreateSessionRecordDto[]>>
    ) {
      const { quizId, data } = action.payload;
      const quiz = state.entities[quizId];

      if (quiz) {
        quiz.records = [...quiz.records, ...data];
      }
    },
    addSession(state, action: PayloadAction<QuizPayload<Session>>) {
      const { quizId, data } = action.payload;
      const quiz = state.entities[quizId];

      if (quiz) {
        quiz.session = data;
      }
    },
    changeStatus(state, action: PayloadAction<QuizPayload<QuizStatus>>) {
      const { quizId, data } = action.payload;
      const quiz = state.entities[quizId];

      if (quiz) {
        quiz.status = data;
      }
    },
    setRandomPairs(state, action: PayloadAction<QuizPayload<Pair[]>>) {
      const { quizId, data } = action.payload;
      state.randomPairs = data;
    },
  },
});

export const QuizesReducer = quizesSlice.reducer;

export const {
  selectById: selectQuizById,
  selectAll: selectAllQuizes,
  selectIds: selectQuizesIds,
} = quizAdapter.getSelectors((state: RootState) => state.quizes);

export const {
  createQuiz,
  setCurrentQuiz,
  setCurrentSession,
  addSession,
  addHosts,
  addGroups,
  addAbsentStudents,
  addPresentStudents,
  addCreateSessionRecordDto,
  adjustSessionConfig,
  setRandomPairs,
} = quizesSlice.actions;
