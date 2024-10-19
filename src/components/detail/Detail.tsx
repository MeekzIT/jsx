import { Box, Typography } from "@mui/material";
import { Board, Equipment, Image, Self, Spare } from "../../store/types";
import ImageSlider from "../slider/Slider";
import { useTranslation } from "react-i18next";
import TextParcer from "../textParcer/TextParser";

interface IDetailProps {
  data?: Self | Board | Equipment | Spare;
  images: Image[];
}

const Detail = ({ data, images }: IDetailProps) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: "1200px", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          p: 2,
          gap: { xs: "16px", md: "30px" },
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            maxHeight: { xs: "250px", md: "400px" },
          }}
        >
          <ImageSlider images={images} />
        </Box>

        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h2"
            sx={{
              color: "#00838d",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              mb: 2,
            }}
          >
            {language === "am"
              ? data?.titleAm
              : language === "ru"
              ? data?.titleRu
              : language === "en"
              ? data?.titleEn
              : data?.titleGe}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 1, md: 3 }, mt: { xs: 2, md: 4 } }}>
        {language === "am" ? (
          <TextParcer data={JSON.parse(data?.descAm)} />
        ) : language === "ru" ? (
          <TextParcer data={JSON.parse(data?.descRu)} />
        ) : language === "en" ? (
          <TextParcer data={JSON.parse(data?.descEn)} />
        ) : (
          <TextParcer data={JSON.parse(data?.descGe)} />
        )}
      </Box>
    </Box>
  );
};

export default Detail;
