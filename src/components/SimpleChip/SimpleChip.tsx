import { Chip } from "@mui/material";
import { blue, green, purple } from "@mui/material/colors";
import React from "react";

type Props = {
  type: "best" | "win" | "score";
  score?: number;
};

const SimpleChip = ({ type, score = 0 }: Props) => {
  switch (type) {
    case "best":
      return (
        <Chip label="BEST" sx={{ bgcolor: purple[700], color: "white" }} />
      );
    case "win":
      return <Chip label="WIN" sx={{ bgcolor: green[500], color: "white" }} />;
    case "score":
      return (
        <Chip
          label={`Score: ${score}`}
          sx={{ bgcolor: blue[500], color: "white" }}
        />
      );
  }
};

export default SimpleChip;
