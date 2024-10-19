import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import {
  Board,
  Equipment,
  Image,
  Module,
  Self,
  Spare,
} from "../../store/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ICardSmall {
  data: Self | Module | Equipment | Board | Spare;
  image: Image;
  href: string;
}

export default function CardSmall({ data, image, href }: ICardSmall) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.language;

  return (
    <Card sx={{ width: 300 }} onClick={() => navigate(href + data.id)}>
      <CardMedia
        sx={{ height: 100 }}
        image={image.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {Object.hasOwn(data, "titleAm")
            ? language === "am"
              ? data?.titleAm
              : language === "ru"
              ? data?.titleRu
              : language === "en"
              ? data?.titleEn
              : data?.titleGe
            : language === "am"
            ? data?.nameAm
            : language === "ru"
            ? data?.nameRu
            : language === "en"
            ? data?.nameEn
            : data?.nameGe}
        </Typography>
      </CardContent>
    </Card>
  );
}
