import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import meekz from "./meekz-it.svg";
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#00838D",
        color: "#fff",
        paddingTop: 3,
        paddingBottom: 3,
        mt: "auto", // Ensures the footer pushes down if there's little content
        minHeight: "40px",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Social Media Icons */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <IconButton
                aria-label="Facebook"
                component="a"
                href="https://www.facebook.com/LJS.innovations"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                component="a"
                href="https://www.instagram.com/js_innovations_"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Page Links */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "center" },
                gap: "20px",
              }}
            >
              JSX MACHINES - Инновации сила будущего
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: {
                  xs: "center",
                  md: "right",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                },
              }}
            >
              <Typography variant="body2" sx={{ color: "#fff" }}>
                &copy; {currentYear} Created by
              </Typography>
              <a
                href="https://meekz-it.vercel.app/"
                target="_blank"
                style={{ height: "30px" }}
              >
                <img src={meekz} alt="meekz" />
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
