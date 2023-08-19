import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";

type Props = {};

const AppBar = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="large" aria-label="large button group">
        <Button key="home">Home</Button>
        <Button key="sessions">Sessions</Button>
        <Button key="scores">Scores</Button>
        <Button key="aboutUs">About US</Button>
      </ButtonGroup>
    </Box>
  );
};

export default AppBar;
