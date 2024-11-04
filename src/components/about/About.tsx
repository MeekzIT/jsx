import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import { Box, Typography } from "@mui/material";
import TextParcer from "../textParcer/TextParser";
import video from "./video.mp4";
import { useState } from "react";
import { SimpleDialog } from "../dialog/Dialog";
import { styled } from "@mui/system";

const About = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const { about } = useAppSelector((state) => state.service);
  const language = i18n.language;
  if (!about) return null;

  // Define animation as a styled component with @keyframes in MUI syntax
  const AnimatedTitle = styled(Typography)`
    opacity: 0;
    animation: fadeInOut 3s ease-in-out infinite;

    @keyframes fadeInOut {
      0%,
      100% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }
  `;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Adjusted for mobile layout
        justifyContent: "space-around",
        backgroundImage: about.image ? `url(${about.image})` : "none",
        backgroundSize: "cover",
        width: "100vw",
        height: "100%",
        scrollSnapAlign: "start",
        alignItems: "center",
        transition: "opacity 0.6s ease-in-out",
        overflow: "hidden",
        padding: { xs: 0, md: "2" }, // Add padding for mobile
      }}
    >
      <Box
        sx={{
          pt: 3,
          maxWidth: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          pl: { xs: "0", md: "100px" },
        }}
      >
        <AnimatedTitle variant="h4" sx={{ color: "#00838D" }}>
          {language === "am"
            ? about.titleAm
            : language === "ru"
            ? about.titileRu
            : language === "en"
            ? about.titileEn
            : about.titleGe}
        </AnimatedTitle>
        <Typography sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
          {language === "am" ? (
            <TextParcer
              data={JSON.parse(about.textAm)}
              background="none"
              color="white"
            />
          ) : language === "ru" ? (
            <TextParcer
              data={JSON.parse(about.textRu)} // Simplified logic for fetching text
              background="none"
              color="white"
            />
          ) : language === "en" ? (
            <TextParcer
              data={JSON.parse(about.textEn)} // Simplified logic for fetching text
              background="none"
              color="white"
            />
          ) : (
            <TextParcer
              data={JSON.parse(about.textGe)} // Simplified logic for fetching text
              background="none"
              color="white"
            />
          )}
        </Typography>
      </Box>
      <Box
        sx={{ pt: 3, width: "50%", display: "flex", justifyContent: "center" }}
      >
        <video
          autoPlay
          muted
          loop
          controls={false}
          className="vide-preview"
          onClick={() => setOpen(true)}
          style={{
            maxWidth: "400px", // Limit the size on larger screens
            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      </Box>
      <SimpleDialog open={open} onClose={() => setOpen(false)}>
        <Box>
          <video autoPlay width="400" height="100%" controls>
            <source src={video} type="video/mp4" />
          </video>
        </Box>
      </SimpleDialog>
    </Box>
  );
};

export default About;
