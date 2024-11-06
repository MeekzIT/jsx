// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Box, Typography } from "@mui/material";
import { Gallery } from "react-grid-gallery";
import Loading from "../loading/Loading";
import { useEffect } from "react";
import { fetchData } from "../../store/slices/gallerySlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GALLERY_PAGE } from "../../assets/paths";

const GallerySmall = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        justifyContent: "space-around",
        backgroundSize: "cover",
        width: "100vw",
        height: "100%",
        scrollSnapAlign: "start",
        alignItems: "center",
        transition: "opacity 0.6s ease-in-out",
        overflow: "hidden",
        padding: { xs: 0, md: "2" },
      }}
    >
      <Typography variant="h3" sx={{ ml: 2, mt: 2, mb: 2, color: "#00838D" }}>
        {t("gallery")}
      </Typography>
      <Gallery
        images={data.slice(0, 30)}
        isSelected={false}
        onClick={() => navigate(GALLERY_PAGE)}
      />
    </Box>
  );
};

export default GallerySmall;
