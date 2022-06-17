import { Box } from "@mui/material";
import Aside from "./Aside";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import NavBar from "./NavBar";
interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <Box
      className="container"
      sx={{
        // bgcolor: "background.default",
        bgcolor: "blue",
        color: "text.primary",
        height: "100vh",
      }}
    >
      <Header />
      <NavBar />
      <Main />
      <Aside />
      <Footer />
    </Box>
  );
}
