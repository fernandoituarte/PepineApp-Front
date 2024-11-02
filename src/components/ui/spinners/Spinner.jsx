import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function Spinner() {
  return (
    <div className="">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <CircularProgress size={60} color="success" />
      </Box>
    </div>
  );
}
