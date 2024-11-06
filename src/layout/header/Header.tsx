import React, { useState, lazy, Suspense, ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Box,
  Fade,
} from "@mui/material";
import logo from "./jsx.png";
import drowerLogo from "./Whts Up.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const SelfHeader = lazy(
  () => import("../../components/header-components/Self")
);
const ModuleHeader = lazy(
  () => import("../../components/header-components/Module")
);
const EquipmentHeader = lazy(
  () => import("../../components/header-components/Equipment")
);
const BoardHeader = lazy(
  () => import("../../components/header-components/Board")
);
const LanguageSwitcher = lazy(
  () => import("../../components/languageSwitcher/LanguageSwitcher")
);
const ConstructorHeader = lazy(
  () => import("../../components/header-components/Constructor")
);
const SpareHeader = lazy(
  () => import("../../components/header-components/Spare")
);

import {
  CONSTRUCTOR_MOBILE,
  EQUIP_MOBILE,
  GALLERY_PAGE,
  MODULE_MOBILE,
  SELF_MOBILE,
  SPARE_MOBILE,
} from "../../assets/paths";
import GallerySmall from "../../components/gallery/Gallery";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
  const [drawerContent, setDrawerContent] = useState<string | ReactNode>("");

  const pages = [
    {
      name: t("self"),
      content: <SelfHeader />,
      show: true,
      mobilePath: SELF_MOBILE,
    },
    {
      name: t("module"),
      content: <ModuleHeader />,
      show: true,
      mobilePath: MODULE_MOBILE,
    },
    {
      name: t("equip"),
      content: <EquipmentHeader />,
      show: true,
      mobilePath: EQUIP_MOBILE,
    },
    { name: t("board"), content: <BoardHeader />, show: true },
    {
      name: t("spare"),
      content: <SpareHeader />,
      mobilePath: SPARE_MOBILE,
      show: true,
    },
    {
      name: t("gallery"),
      content: <GallerySmall />,
      mobilePath: GALLERY_PAGE,
      show: true,
      href: GALLERY_PAGE,
    },
    {
      name: t("constructor"),
      content: <ConstructorHeader />,
      mobilePath: CONSTRUCTOR_MOBILE,
      show: true,
      className: "animated-border",
    },
    {
      name: "Monitoring",
      content: (
        <h2>
          Наша система через который ты можешь следить работу мойки и сделать
          настройки недобераясь на мойку а через телефон !
        </h2>
      ),
      show: false,
      href: "https://monitoring.jsxmachines.com",
    },
    {
      name: "Reserve",
      content: <h2>Coming Soon !</h2>,
      show: false,
      href: "http://reserve.jsxmachines.com/",
    },
  ];

  const handleMouseEnter = (pageContent: string | JSX.Element) => {
    setDrawerContent(pageContent);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setDrawerContent("");
  };
  const renderDrawer = (
    <Drawer
      anchor="top"
      open={drawerOpen}
      onClose={handleCloseDrawer}
      variant="persistent"
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          padding: 2,
          zIndex: 1300,
        },
      }}
    >
      <Box sx={{ padding: 2 }} onMouseLeave={handleCloseDrawer}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginRight: "16px",
            }}
          >
            <img src={logo} alt="logo" width={110} height={80} />
          </Link>

          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              gap: 2,
              color: "#00838D",
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                href={page.href ? page.href : undefined}
                color="inherit"
                sx={{
                  ...(page.className === "animated-border" && {
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      border: "2px solid transparent",
                      borderRadius: "inherit",
                      animation: "outline-animation 2s linear infinite",
                      zIndex: -1,
                    },
                    "@keyframes outline-animation": {
                      "0%": { borderColor: "transparent" },
                      "50%": { borderColor: "#00838D" },
                      "100%": { borderColor: "transparent" },
                    },
                  }),
                }}
                onMouseEnter={() => {
                  handleMouseEnter(page.content);
                }}
              >
                {page.show ? (
                  page.name
                ) : (
                  <a
                    href={page.href}
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.name}
                  </a>
                )}
              </Button>
            ))}
          </Box>

          <Button color="inherit" sx={{ marginLeft: "16px", color: "#00838D" }}>
            <Link
              to="/contact-us"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("contactUs")}
            </Link>
          </Button>
          <LanguageSwitcher />
        </Box>

        <Fade in={drawerOpen} timeout={100}>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            <Suspense fallback={<div>Loading...</div>}>
              <TransitionGroup component={null}>
                {drawerContent && (
                  <CSSTransition timeout={900} classNames="fade">
                    <div>{drawerContent}</div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </Suspense>
          </Typography>
        </Fade>
      </Box>
    </Drawer>
  );
  const renderBurger = (
    <Drawer
      anchor="left"
      open={burgerOpen}
      onClose={() => setBurgerOpen(false)}
      variant="persistent"
    >
      <Box sx={{ padding: 2 }} onMouseLeave={handleCloseDrawer}>
        <Box
          sx={{
            display: "flex",
            mb: 2,
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginRight: "16px",
            }}
          >
            <img src={logo} alt="logo" width={110} height={80} />
          </Link>

          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              color: "#00838D",
              mt: 2,
            }}
          >
            {pages.map((page, index) => (
              <Button key={index} href={page.mobilePath} color="inherit">
                {page.show ? (
                  page.name
                ) : (
                  <a
                    href={page.href}
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.name}
                  </a>
                )}
              </Button>
            ))}
          </Box>

          <Button color="inherit" sx={{ color: "#00838D" }}>
            <Link
              to="/contact-us"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("contactUs")}
            </Link>
            ``
          </Button>
          <LanguageSwitcher />
        </Box>
        {typeof drawerContent === "string" ? (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {drawerContent}
          </Typography>
        ) : (
          drawerContent
        )}

        {/* {typeof drawerContent === "string" ? drawerContent : drawerContent} */}
        {/* </Typography> */}
      </Box>
    </Drawer>
  );

  return (
    <AppBar
      sx={{
        backgroundColor: "#00838D",
        zIndex: 1200,
        position: "sticky",
        top: 0,
        height: "90px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={drowerLogo} alt="logo" width={100} height={80} />
          </Link>
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {pages.map((page, index) => (
            <Button
              key={index}
              color="inherit"
              sx={{
                ...(page.className === "animated-border" && {
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: "2px solid transparent",
                    borderRadius: "inherit",
                    animation: "outline-animation 2s linear infinite",
                    zIndex: -1,
                  },
                  "@keyframes outline-animation": {
                    "0%": { borderColor: "transparent" },
                    "50%": { borderColor: "red" },
                    "100%": { borderColor: "transparent" },
                  },
                }),
              }}
              onMouseEnter={() => handleMouseEnter(page.content)}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        <Button color="inherit" sx={{ display: { xs: "none", md: "flex" } }}>
          <Link
            to="/contact-us"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {t("contactUs")}
          </Link>
          <LanguageSwitcher />
        </Button>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={() => setBurgerOpen(!burgerOpen)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {renderDrawer}
      {renderBurger}
    </AppBar>
  );
};

export default Header;
