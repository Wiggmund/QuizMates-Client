import React from "react";
import { Host } from "../../model";
import { getFullName } from "../../utils";
import { fetchSessionsByHostId } from "../../data";
import { Stack, Typography } from "@mui/material";
import SessionsTable from "../SessionsTable/SessionsTable";

type Props = {
  host: Host;
};

const HostCard = ({ host }: Props) => {
  const hostFullName = getFullName(host);
  const sessions = fetchSessionsByHostId(host.id);

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
      <SessionsTable sessions={sessions} />
    </Stack>
  );
};

export default HostCard;
