import { Student } from "../../model";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { studentsSource } from "../../data";
import { __String } from "typescript";

type StudentUrlParams = {
  studentId: string;
};

type StudentProps = {};

const StudentCard = (props: StudentProps) => {
  const students = studentsSource.slice();
  let studentId = Number.parseInt(
    useParams<StudentUrlParams>().studentId as string
  );
  const student = students.find((st) => st.id === studentId);

  if (!student) {
    return (
      <Typography variant="h1" color="error">
        Student with {studentId} NOT FOUND
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" color="primary">
        {student.firstName} {student.lastName}
      </Typography>
      <Typography variant="body2" color="primary">
        Student ID: {student.id}
      </Typography>
      <Typography variant="body2" color="primary">
        Group ID: {student.id}
      </Typography>
    </Container>
  );
};

export default StudentCard;
