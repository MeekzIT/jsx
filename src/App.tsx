import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

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
// import Spare from "./pages/Spare";
import BoardHeader from "./components/header-components/Board";
import EquipmentHeader from "./components/header-components/Equipment";
// import SpareHeader from "./components/header-components/Spare";
import ConstructorHeader from "./components/header-components/Constructor";
import ModuleHeader from "./components/header-components/Module";
import SelfHeader from "./components/header-components/Self";
import {
  BOARD_MOBILE,
  CONSTRUCTOR_MOBILE,
  EQUIP_MOBILE,
  GALLERY_PAGE,
  MODULE_MOBILE,
  SELF_MOBILE,
  // SPARE_MOBILE,
} from "./assets/paths";
import GalleryPage from "./pages/Gallery";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#008496",
      },
    },
  });
  return (
    <HelmetProvider>
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
              {/* <Route path="/spare/:id" element={<Spare />} /> */}
              <Route path="/constuctor/:id" element={<Constructor />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path={GALLERY_PAGE} element={<GalleryPage />} />
              //mobile menu
              <Route path={SELF_MOBILE} element={<SelfHeader />} />
              <Route path={MODULE_MOBILE} element={<ModuleHeader />} />
              <Route path={EQUIP_MOBILE} element={<EquipmentHeader />} />
              <Route path={BOARD_MOBILE} element={<BoardHeader />} />
              {/* <Route path={SPARE_MOBILE} element={<SpareHeader />} /> */}
              <Route
                path={CONSTRUCTOR_MOBILE}
                element={<ConstructorHeader />}
              />
            </Routes>
          </Router>
        </Layout>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
