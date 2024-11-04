import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { fetchData } from "../store/slices/gallerySlice";
import { Gallery } from "react-grid-gallery";
import { Typography } from "@mui/material";
import Loading from "../components/loading/Loading";
import { useTranslation } from "react-i18next";

const GalleryPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <>
      <Typography variant="h3" sx={{ ml: 2, mt: 2, mb: 2, color: "#00838D" }}>
        {t("gallery")}
      </Typography>
      <Gallery images={data} isSelected={false} />
    </>
  );
};

export default GalleryPage;
