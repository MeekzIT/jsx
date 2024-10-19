import React, { useState } from "react";
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
import SelfHeader from "../../components/header-components/Self";
import ModuleHeader from "../../components/header-components/Module";
import EquipmentHeader from "../../components/header-components/Equipment";
import BoardHeader from "../../components/header-components/Board";
import LanguageSwitcher from "../../components/languageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import ConstructorHeader from "../../components/header-components/Constructor";
import SpareHeader from "../../components/header-components/Spare";

const Header: React.FC = () => {
  const { t } = useTranslation();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
  const [drawerContent, setDrawerContent] = useState<string>("");

  const pages = [
    {
      name: t("self"),
      content: <SelfHeader />,
      show: true,
    },
    { name: t("module"), content: <ModuleHeader />, show: true },
    {
      name: t("equip"),
      content: <EquipmentHeader />,
      show: true,
    },
    { name: t("board"), content: <BoardHeader />, show: true },
    {
      name: t("spare"),
      content: <SpareHeader />,
      show: true,
    },
    {
      name: t("constructor"),
      content: <ConstructorHeader />,
      show: true,
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
                href={page.link ? page.link : undefined}
                color="inherit"
                onMouseEnter={() => handleMouseEnter(page.content)}
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
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {typeof drawerContent === "string" ? drawerContent : drawerContent}
        </Typography>
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
      <Box sx={{ padding: 2 }} onMouseLeave={() => setBurgerOpen(false)}>
        asdasd
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
              onMouseEnter={() => handleMouseEnter(page.content)}
            >
              <Link
                to={`/${page.name.toLowerCase()}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {page.name}
              </Link>
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
        </Button>
        <LanguageSwitcher />

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
