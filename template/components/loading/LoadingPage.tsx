import { Skeleton, Stack, Container } from "@mui/material";
import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";

export default function LoadingPage() {
  const animate = "wave";
  return (
    <Fragment>
      <Container sx={{ height: "94vh", padding: "0" }}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={-3}>
          {[0, 1, 2].map((i) => (
            <Typography key={i} variant="h2" width="100%">
              <Skeleton animation={animate} variant="text" />
            </Typography>
          ))}
        </Stack>
      </Container>
    </Fragment>
  );
}
