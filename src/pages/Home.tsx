import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchAbout, fetchData } from "../store/slices/servicesSlice";
import Loading from "../components/loading/Loading";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextParcer from "../components/textParcer/TextParser";
import About from "../components/about/About";
import GallerySmall from "../components/gallery/Gallery";
import Partners from "../components/partners/Partners";

const Home = () => {
  const dispatch = useAppDispatch();
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data, loading, error } = useAppSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchAbout());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>{t("home")}</title>
        <meta
          name="description"
          content="Добро пожаловать на главную страницу"
        />
      </Helmet>
      <Box
        sx={{
          height: "90vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          padding: 0,
          margin: 0,
        }}
      >
        <About />
        <GallerySmall />

        {data.map((section, index) => (
          <Box
            ref={(el: HTMLDivElement | null) => {
              if (el) sectionRefs.current[index] = el;
            }}
            key={section.id}
            sx={{
              width: "100vw",
              height: "100%",
              scrollSnapAlign: "start",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "opacity 2s ease-in-out",
              flexDirection: "column",
              overflow: "hidden",
              padding: 0,
            }}
          >
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
              sx={{
                maxWidth: "1200px",
                width: "100%",
                height: "100%",
                flexDirection: {
                  xs: "row",
                  md: index % 2 === 0 ? "row" : "row-reverse",
                },
                overflow: "hidden",
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center", // Center image on mobile
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  style={{
                    maxWidth: "100%", // Ensure image doesn't exceed container width
                    height: "auto",
                    objectFit: "contain",
                    maxHeight: "70vh",
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  padding: { xs: "8px", md: "16px" }, // Adjust padding on mobile
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#008496",
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  {section.title}
                </Typography>

                {language === "am" ? (
                  <TextParcer data={JSON.parse(section?.descAm)} />
                ) : language === "ru" ? (
                  <TextParcer data={JSON.parse(section?.descRu)} />
                ) : language === "en" ? (
                  <TextParcer data={JSON.parse(section?.descEn)} />
                ) : (
                  <TextParcer data={JSON.parse(section?.descGe)} />
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
        <Partners />
      </Box>
    </>
  );
};

export default Home;
