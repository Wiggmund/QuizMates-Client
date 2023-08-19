import { Student } from "../../model";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

type StudentProps = {
  student: Student;
};

const StudentCard = ({ student }: StudentProps) => {
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
