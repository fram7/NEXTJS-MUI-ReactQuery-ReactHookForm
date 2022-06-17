import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Alert, Link, Box } from "@mui/material";
import { AxiosError } from "axios";
import { SyntheticEvent, useState } from "react";
import { ErrorItem } from "./ErrorItem";
import * as React from "react";

interface ErrorMessageProps {
  open: boolean;
  error: unknown;
  handleClose: (event: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => void;
}
export default function ErrorHandler({ open, handleClose, error }: ErrorMessageProps) {
  const [showDetail, setShowDetail] = useState(false);

  if (error as AxiosError) {
    const errorAxios = error as AxiosError;

    return (
      <Snackbar
        onClose={handleClose}
        open={open}
        // autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <Link
            href="#"
            color="inherit"
            underline="hover"
            onClick={() => {
              setShowDetail((e) => !e);
            }}
          >
            {errorAxios.message}
          </Link>
          {showDetail && (
            <Box
              sx={{
                marginTop: "5px",
                marginLeft: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowDetail((e) => !e);
              }}
            >
              {/* <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                Descripción tecnica:
              </Typography> */}

              <ul>
                <ErrorItem titulo={"URL"} texto={errorAxios.config.url} />
                <ErrorItem titulo={"Method"} texto={errorAxios.config.method} />
                <ErrorItem titulo={"Request"} texto={JSON.stringify(errorAxios.request)} />
                <ErrorItem titulo={"Response"} texto={JSON.stringify(errorAxios.response)} />
              </ul>
            </Box>
          )}
        </Alert>
      </Snackbar>
    );
  } else {
    return (
      <Snackbar
        onClose={handleClose}
        open={open}
        // autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error != null && JSON.stringify(error)}
        </Alert>
      </Snackbar>
    );
  }
}
