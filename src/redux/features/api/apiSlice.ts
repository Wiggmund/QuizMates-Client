import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Student } from '../../../model';

const SERVER_HOST = 'http://localhost:8081';
const SERVER_BASE_URL = 'quizmates';
const BASE_URL = `http://localhost:8081/quizmates`;

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		getStudents: builder.query<Student[], string>({
			query: () => '/students'
		})
	})
});

export const { useGetStudentsQuery } = apiSlice;
