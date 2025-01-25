import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import {
  Board,
  Equipment,
  IConstructor,
  Image,
  Module,
  Self,
  Spare,
} from "../../store/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch } from "../../hooks/hooks";
import { setActive } from "../../store/slices/constructorSlice";

interface ICardSmall {
  data: Self | Module | Equipment | Board | Spare | IConstructor;
  image: Image;
  href: string;
}

export default function CardSmall({ data, image, href }: ICardSmall) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const language = i18n.language;
  const [isHovered, setIsHovered] = useState(false);

  // Helper function to get title or name based on language
  const getTitleOrName = () => {
    if ("titleAm" in data) {
      return language === "am"
        ? data.titleAm
        : language === "ru"
        ? data.titleRu
        : language === "en"
        ? data.titleEn
        : data.titleGe;
    } else {
      return language === "am"
        ? data.nameAm
        : language === "ru"
        ? data.nameRu
        : language === "en"
        ? data.nameEn
        : data.nameGe;
    }
  };

  return (
    <CSSTransition in={isHovered} timeout={1000} classNames="card-hover">
      <Card
        sx={{ width: 300, cursor: "pointer" }}
        onClick={() => {
          navigate(`${href}${data.id}`);
          dispatch(setActive(null));
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardMedia
          sx={{ height: 200, display: "block" }}
          image={image.image}
          title={getTitleOrName()}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {getTitleOrName()}
          </Typography>
        </CardContent>
      </Card>
    </CSSTransition>
  );
}
