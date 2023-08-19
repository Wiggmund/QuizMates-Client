import React from "react";
import { useGetStudentsQuery } from "../../redux/features/api/apiSlice";
import { Student } from "../../model";
import StudentCard from "../StudentCard/StudentCard";
import { studentsSource } from "../../data";

const StudentsList = () => {
  const students = studentsSource.slice(0);

  let content;
  console.log(students);
  content = students.map((student) => <StudentCard student={student} />);

  return (
    <>
      <div>studentsList</div>
      {content}
    </>
  );
};

export default StudentsList;
