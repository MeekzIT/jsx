import React, { useState, lazy, Suspense, ReactNode, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Box,
} from "@mui/material";
import logo from "./jsx.png";
import drowerLogo from "./Whts Up.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

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
import CurrencySwitcher from "../../components/languageSwitcher/CurrencySwitcher";
import { usePathChanged } from "../../hooks/usePathChanged";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [pathChanged, setPathChanged] = usePathChanged();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [active, setActive] = useState<number>(1);
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
  const [drawerContent, setDrawerContent] = useState<string | ReactNode>("");

  const pages = [
    {
      id: 1,
      name: t("self"),
      content: <SelfHeader />,
      show: true,
      mobilePath: SELF_MOBILE,
    },
    {
      id: 2,
      name: t("module"),
      content: <ModuleHeader />,
      show: true,
      mobilePath: MODULE_MOBILE,
    },
    {
      id: 3,
      name: t("equip"),
      content: <EquipmentHeader />,
      show: true,
      mobilePath: EQUIP_MOBILE,
    },
    {
      id: 4,
      name: t("board"),
      content: <BoardHeader />,
      show: true,
    },
    {
      id: 5,
      name: t("spare"),
      content: <SpareHeader />,
      mobilePath: SPARE_MOBILE,
      show: true,
    },
    {
      id: 6,
      name: t("gallery"),
      content: <GallerySmall />,
      mobilePath: GALLERY_PAGE,
      show: true,
      href: GALLERY_PAGE,
    },
    {
      id: 7,
      name: t("constructor"),
      content: <ConstructorHeader />,
      mobilePath: CONSTRUCTOR_MOBILE,
      show: true,
      className: "animated-border",
    },
    {
      id: 8,
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
      id: 9,
      name: "Reserve",
      content: <h2>Coming Soon !</h2>,
      show: false,
      href: "http://reserve.jsxmachines.com/",
    },
  ];

  const handleMouseEnter = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setDrawerContent("");
  };

  useEffect(() => {
    const currency = localStorage.getItem("currency");
    if (!currency) {
      localStorage.setItem("currency", "en");
    }
  }, []);

  useEffect(() => {
    if (pathChanged) {
      setDrawerOpen(false);
      setPathChanged(false);
    }
  }, [pathChanged, setPathChanged]);

  const renderDrawer = (
    <Drawer
      anchor="top"
      transitionDuration={{
        enter: 400,
        exit: 400,
      }}
      open={drawerOpen}
      onClose={handleCloseDrawer}
      variant="persistent"
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          padding: 2,
          zIndex: 1300,
          minHeight: "400px",
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
              color: "#008496",
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                href={page.href ? page.href : undefined}
                color="inherit"
                sx={
                  page.className === "animated-border"
                    ? {
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
                            "50%": { borderColor: "#008496" },
                            "100%": { borderColor: "transparent" },
                          },
                        }),
                      }
                    : {
                        color: page.id === active ? "white" : "#008496",
                        borderBottom:
                          page.id === active ? "2px solid #008496" : undefined,
                        background: page.id === active ? "#008496" : undefined,
                        padding: "0 10px",
                      }
                }
                onClick={() => {
                  setActive(page.id);
                }}
                onMouseEnter={handleMouseEnter}
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

          <Button color="inherit" sx={{ marginLeft: "16px", color: "#008496" }}>
            <Link
              to="/contact-us"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("contactUs")}
            </Link>
          </Button>
          <LanguageSwitcher />
          <CurrencySwitcher />
        </Box>
        <Suspense fallback={<div>Loading...</div>}>
          {pages.map((page) => {
            if (active === page.id) {
              return <div key={page.id}>{page.content}</div>;
            }
            return;
          })}
        </Suspense>
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
              color: "#008496",
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

          <Button color="inherit" sx={{ color: "#008496" }}>
            <Link
              to="/contact-us"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("contactUs")}
            </Link>
            ``
          </Button>
          <LanguageSwitcher />
          <CurrencySwitcher />
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
        backgroundColor: "#008496",
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
          <CurrencySwitcher />
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
