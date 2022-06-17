import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // primary: {
    // light: "#33ca63",
    // main: "#00bd3d",
    // dark: "#00842a",
    // },
    // secondary: {
    // light: "#f9cb86",
    // main: "#F8BE68",
    // dark: "#ad8548",
    // },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        contained: {
          color: "white",
        },
      },
    },
  },
});

export default theme;
