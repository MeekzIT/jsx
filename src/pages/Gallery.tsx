// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { fetchData } from "../store/slices/gallerySlice";
import { Gallery } from "react-grid-gallery";
import { Typography } from "@mui/material";
import Loading from "../components/loading/Loading";
import { useTranslation } from "react-i18next";
import { SimpleDialog } from "../components/dialog/Dialog";
import { Image } from "../store/types";

const GalleryPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Image>();
  const { data, loading } = useAppSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <>
      <Typography variant="h3" sx={{ ml: 2, mt: 2, mb: 2, color: "#008496" }}>
        {t("gallery")}
      </Typography>
      <Gallery
        images={data}
        isSelected={false}
        onClick={(_, item) => {
          setOpen(true);
          setCurrent(item);
        }}
      />
      <SimpleDialog open={open} onClose={() => setOpen(false)}>
        <img
          src={current?.src}
          width={current?.width}
          height={current?.height}
        />
      </SimpleDialog>
    </>
  );
};

export default GalleryPage;
