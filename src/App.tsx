import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./layout/header/Header";
import Home from "./pages/Home";
import Self from "./pages/Self";
import Equipment from "./pages/Equipment";
import Board from "./pages/Board";
import Constructor from "./pages/Constructor";
import ContactUs from "./pages/ContactUs";
import Layout from "./layout/footer/Footer";
import Module from "./pages/Module";
import { createTheme, ThemeProvider } from "@mui/material";
import Spare from "./pages/Spare";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00838D",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/self/:id" element={<Self />} />
            <Route path="/module/:id" element={<Module />} />
            <Route path="/equipment/:id" element={<Equipment />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="/spare/:id" element={<Spare />} />
            <Route path="/constuctor/:id" element={<Constructor />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
