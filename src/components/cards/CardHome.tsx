import { Typography, Box } from "@mui/material";
import { Service } from "../../store/types";
import { useTranslation } from "react-i18next";
import { Editable, Slate, withReact } from "slate-react";
import { useMemo } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";

interface ICardSmall {
  data: Service;
}

export default function CardHome({ data }: ICardSmall) {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const editor = useMemo(() => {
    return withHistory(withReact(createEditor()));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 3,
        minHeight: 400,
      }}
    >
      <Box sx={{ width: "50%" }}>
        <img src={data.image} alt={data.descAm} />
      </Box>
      <Box sx={{ width: "50%" }}>
        <Typography variant="h3" sx={{ color: "#00838D" }}>
          {data.title}
        </Typography>
        <Slate
          editor={editor}
          initialValue={
            language === "am"
              ? JSON.parse(data.descAm)
              : language === "ru"
              ? JSON.parse(data.descRu)
              : language === "en"
              ? JSON.parse(data.descEn)
              : JSON.parse(data.descGe)
          }
        >
          <Editable />
        </Slate>
      </Box>
    </Box>
  );
}
