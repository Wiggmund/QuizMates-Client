import { StudentWithGroup } from "../../model";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useParams } from "react-router-dom";
import {
  fetchGroupById,
  fetchGroupByTeamLeadId,
  fetchSessionsByStudentId,
  fetchStudentById,
  fetchStudentsWithGroupByGroupId,
} from "../../data";
import { getFullName } from "../../utils";
import { Stack } from "@mui/material";
import StudentsTable from "../StudentsTable/StudentsTable";
import { Endpoints } from "../../constants";
import SessionsTable from "../SessionsTable/SessionsTable";

type StudentUrlParams = {
  studentId: string;
};

type StudentProps = {};

const StudentCard = (props: StudentProps) => {
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

  const sessions = fetchSessionsByStudentId(studentId);
  const studentFullName = getFullName(student);
  const studentGroup = fetchGroupById(student.group_id);
  const groupName = studentGroup ? studentGroup.name : "unknown";
  const sessionsCount = sessions.length;
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
          {studentGroup && (
            <Link to={`${Endpoints.groupPage}/${studentGroup.id}`}>
              {studentGroup.name}
            </Link>
          )}
          {studentGroup === undefined && groupName}
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
        <Typography variant="subtitle1" color="initial">
          {studentFullName} is a teamlead of {groupName} and manages next
          students:
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
      <Stack spacing={2} sx={{ py: 4 }}>
        <Typography variant="subtitle1" color="initial">
          Passed sessions:
        </Typography>
        <SessionsTable sessions={sessions} />
      </Stack>
    </Container>
  );
};

export default StudentCard;
