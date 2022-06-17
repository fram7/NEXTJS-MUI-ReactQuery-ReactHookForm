import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";

export interface LoadingInLineProps {
  mensaje?: string;
  horizontalAlign?: "left" | "center" | "right";
}

export default function LoadingInLine({
  mensaje = " Cargando...",
  horizontalAlign = "left",
}: LoadingInLineProps) {
  const justifyContent =
    horizontalAlign === "left" ? "flex-start" : horizontalAlign === "right" ? "flex-end" : "center";

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
      }}
      justifyContent={justifyContent}
      alignItems="center"
      spacing={1}
    >
      <CircularProgress />
      <Typography color="text.primary">{mensaje}</Typography>
    </Stack>
  );
}
