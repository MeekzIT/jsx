import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Box, Typography } from "@mui/material";
import Loading from "../loading/Loading";
import { useEffect } from "react";
import { fetchPartner } from "../../store/slices/gallerySlice";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { partners, loading } = useAppSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  if (loading) return <Loading />;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Box
      sx={{
        justifyContent: "space-around",
        backgroundSize: "cover",
        width: "100vw",
        height: "50%",
        scrollSnapAlign: "start",
        alignItems: "center",
        transition: "opacity 0.6s ease-in-out",
        overflow: "hidden",
        padding: { xs: 0, md: "2" },
      }}
    >
      <Typography variant="h3" color="#008496" ml={2} mb={2}>
        {t("partners")}
      </Typography>
      <Slider {...settings}>
        {partners?.map((img, index) => (
          <div key={index}>
            <img
              src={img.image}
              alt={`Slide ${index + 1}`}
              style={{ width: "300px", height: "250px", margin: "0 10px" }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Partners;
