import { Student, StudentWithGroup } from "../../model";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import {
  fetchGroupById,
  fetchGroupByTeamLeadId,
  fetchSessionsCountByStudentId,
  fetchStudentById,
  fetchStudentsByGroup,
  fetchStudentsWithGroupByGroupId,
  studentsSource,
} from "../../data";
import { getFullName } from "../../utils";
import { Box, Paper, Stack } from "@mui/material";
import StudentsTable from "../StudentsTable/StudentsTable";

type StudentUrlParams = {
  studentId: string;
};

type StudentProps = {};

const StudentCard = (props: StudentProps) => {
  const students = studentsSource.slice();
  let studentId = Number.parseInt(
    useParams<StudentUrlParams>().studentId as string
  );
  const student = fetchStudentById(studentId);

  if (!student) {
    return (
      <Typography variant="h1" color="error">
        Student with {studentId} NOT FOUND
      </Typography>
    );
  }

  const studentFullName = getFullName(student);
  const groupName = fetchGroupById(student.group_id)?.name || "unknown";
  const sessionsCount = fetchSessionsCountByStudentId(student.id);
  const teamLeadTitle = "TEAMLEAD";

  const infoBlock = (
    <Stack
      spacing={4}
      direction="row"
      justifyContent="space-around"
      sx={{ py: 4 }}
    >
      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          ID
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
          {student.id}
        </Typography>
      </Stack>

      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          Group
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
          {groupName}
        </Typography>
      </Stack>

      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          Passed sessions
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
          {sessionsCount}
        </Typography>
      </Stack>
    </Stack>
  );

  let teamLeadBlock;
  if (student.isTeamLead) {
    let students: StudentWithGroup[] = [];
    const targetGroup = fetchGroupByTeamLeadId(student.id);

    if (targetGroup) {
      students = fetchStudentsWithGroupByGroupId(targetGroup.id);
      students = students.filter((st) => st.id !== student.id);
    }

    teamLeadBlock = (
      <Stack spacing={2}>
        <Typography variant="h5" color="initial">
          {studentFullName} is a teamlead of {groupName} and manages next
          students
        </Typography>
        <StudentsTable students={students} />
      </Stack>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" color="initial">
        {studentFullName}
      </Typography>
      {infoBlock}
      {teamLeadBlock}
    </Container>
  );
};

export default StudentCard;
