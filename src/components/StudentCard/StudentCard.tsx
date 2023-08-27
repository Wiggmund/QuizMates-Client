import {
  GROUP_NOT_FOUND_BY_ID,
  GROUP_STUDENTS_FETCH_ERROR,
  SESSION_RECS_FETCH_BY_STUDENT_ERROR,
  STUDENT_NOT_FOUND_BY_ID,
  Student,
} from "../../model";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useParams } from "react-router-dom";
import { distinct, getFullName, getGroupNameOrUnknown } from "../../utils";
import { CircularProgress, Stack } from "@mui/material";
import StudentsTable from "../StudentsTable/StudentsTable";
import { Endpoints } from "../../constants";
import SessionsTable from "../SessionsTable/SessionsTable";
import {
  useGetStudentByIdQuery,
  useGetAllSessionRecordsByStudentIdQuery,
  useGetGroupByIdQuery,
  useGetAllGroupStudentsQuery,
} from "../../redux";
import { ResourceNotFoundException } from "../../exceptions";

type GroupInfoBlockProps = {
  groupId: number;
};
const GroupInfoBlock = ({ groupId }: GroupInfoBlockProps) => {
  const {
    data: group,
    isSuccess,
    isError,
    error,
  } = useGetGroupByIdQuery(groupId);

  if (!isSuccess) {
    if (isError) throw new Error("Failed to fetch group by id");

    return <CircularProgress />;
  }

  return (
    <Stack alignItems="center">
      <Typography variant="caption" color="initial">
        Group
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
        {group ? (
          <Link to={`${Endpoints.groupPage}/${group.id}`}>{group.name}</Link>
        ) : (
          getGroupNameOrUnknown(group)
        )}
      </Typography>
    </Stack>
  );
};

type TeamleadBlockProps = {
  groupId: number;
  student: Student;
};
const TeamleadBlock = ({ groupId, student }: TeamleadBlockProps) => {
  const {
    data: group,
    isSuccess: isSuccessGroup,
    isError: isErrorGroup,
    error: errorGroup,
  } = useGetGroupByIdQuery(groupId);

  const {
    data: groupStudents,
    isSuccess: isSuccessGroupStudents,
    isError: isErrorGroupStudents,
    error: errorGroupStudents,
  } = useGetAllGroupStudentsQuery(groupId);

  if (!isSuccessGroup || !isSuccessGroupStudents) {
    if (isErrorGroup)
      throw new ResourceNotFoundException(GROUP_NOT_FOUND_BY_ID(groupId));
    if (isErrorGroupStudents)
      throw new ResourceNotFoundException(GROUP_STUDENTS_FETCH_ERROR(groupId));

    return <CircularProgress />;
  }

  if (student.id !== group.teamleadId) return null;
  const studentsIds = groupStudents.map((student) => student.id);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" color="initial">
        {getFullName(student)} is a teamlead of {getGroupNameOrUnknown(group)}{" "}
        and manages next students:
      </Typography>
      <StudentsTable studentsIds={studentsIds} />
    </Stack>
  );
};

type StudentUrlParams = {
  studentId: string;
};

type StudentCardProps = {};
const StudentCard = (props: StudentCardProps) => {
  let studentId = Number.parseInt(
    useParams<StudentUrlParams>().studentId as string
  );

  const {
    data: student,
    isSuccess: isSuccessStudent,
    isError: isErrorStudent,
    error: errorStudent,
  } = useGetStudentByIdQuery(studentId);

  const {
    data: studentRecords,
    isSuccess: isSuccessSessionRecords,
    isError: isErrorSessionRecords,
    error: errorSessionRecords,
  } = useGetAllSessionRecordsByStudentIdQuery(studentId);

  if (!isSuccessStudent || !isSuccessSessionRecords) {
    if (isErrorStudent)
      throw new ResourceNotFoundException(STUDENT_NOT_FOUND_BY_ID(studentId));
    if (isErrorSessionRecords)
      throw new ResourceNotFoundException(
        SESSION_RECS_FETCH_BY_STUDENT_ERROR(studentId)
      );

    return <CircularProgress />;
  }

  const sessionsIds = distinct<number>(
    studentRecords.map((record) => record.sessionId)
  );

  const studentFullName = getFullName(student);
  const sessionsCount = sessionsIds.length;

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

      <GroupInfoBlock groupId={student.groupId} />

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

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" color="initial">
        {studentFullName}
      </Typography>
      {infoBlock}
      <TeamleadBlock groupId={student.groupId} student={student} />
      <Stack spacing={2} sx={{ py: 4 }}>
        <Typography variant="subtitle1" color="initial">
          Passed sessions:
        </Typography>
        <SessionsTable sessionsIds={sessionsIds} />
      </Stack>
    </Container>
  );
};

export default StudentCard;
