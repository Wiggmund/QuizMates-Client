import React from 'react';
import { useGetStudentsQuery } from '../../redux/features/api/apiSlice';
import { Student } from '../../model';

const StudentsList = () => {
	const { data: students, isSuccess, isError, error } = useGetStudentsQuery('');

	let content;
	if (isSuccess) {
		console.log(students);
		content = students.map((student) => <StudentCard student={student} />);
	}

	if (isError) {
		console.log(error);
	}

	return (
		<>
			<div>studentsList</div>
			{content}
		</>
	);
};

export default StudentsList;

type StudentProps = {
	student: Student;
};

const StudentCard = ({ student }: StudentProps) => {
	return (
		<div>
			<h3>
				{student.firstName} {student.lastName}
			</h3>
			<p>id: {student.id}</p>
			<p>group_id: {student.id}</p>
		</div>
	);
};
