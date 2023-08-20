import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Endpoints } from "../../constants";

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
        <Link to={Endpoints.homePage}>
          <Button key="home">Home</Button>
        </Link>
        <Link to={Endpoints.sessionsPage}>
          <Button key="sessions">Sessions</Button>
        </Link>
        <Link to={Endpoints.homePage}>
          <Button key="scores">Scores</Button>
        </Link>
        <Link to={Endpoints.homePage}>
          <Button key="aboutUs">About US</Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
};

export default AppBar;
