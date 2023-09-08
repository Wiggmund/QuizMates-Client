import React from "react";
import { ALL_SESSION_FETCH_ERROR, Host } from "../../model";
import { getFullName } from "../../utils";
import { CircularProgress, Stack, Typography } from "@mui/material";
import SessionsTable from "../SessionsTable/SessionsTable";
import { useGetAllSessionsQuery, useGetHostSessionsQuery } from "../../redux";
import { ResourceNotFoundException } from "../../exceptions";

type Props = {
  host: Host;
};

const HostCard = ({ host }: Props) => {
  const {
    data: sessions,
    isSuccess,
    isError,
    error,
  } = useGetHostSessionsQuery(host.id);

  if (!isSuccess) {
    if (isError) throw new ResourceNotFoundException(ALL_SESSION_FETCH_ERROR());

    return <CircularProgress />;
  }

  const sessionsIds = sessions.map((session) => session.id);
  const hostFullName = getFullName(host);

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
          {host.id}
        </Typography>
      </Stack>

      <Stack alignItems="center">
        <Typography variant="caption" color="initial">
          Sessions conducted
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
          {sessions.length}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Stack>
      <Typography variant="h1" color="initial">
        {hostFullName}
      </Typography>
      {infoBlock}
      <Typography variant="subtitle1" color="initial">
        Conducted sessions:
      </Typography>
      <SessionsTable sessionsIds={sessionsIds} />
    </Stack>
  );
};

export default HostCard;
