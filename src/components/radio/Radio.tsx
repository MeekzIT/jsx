import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { IConstuctorItemOptions } from "../../store/types";
import { useTranslation } from "react-i18next";
import TooltipPrice from "../tooltip/Tooltip";

interface RadioBoxProps {
  name: string;
  options: IConstuctorItemOptions[];
  onChange: (value: string, hasItems?: true) => void;
}

export default function RadioBox({ name, options, onChange }: RadioBoxProps) {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const current = options.find((i) => i.id == event.target.value);
    if (current?.ConstuctorOptionItems?.length > 0) {
      onChange(event.target.value, true);
    } else {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl sx={{ ml: 3 }}>
      <FormLabel>{name}</FormLabel>
      <RadioGroup
        defaultValue={options.length && options[0].id}
        name="radio-buttons-group"
        onChange={handleRadioChange}
      >
        {options?.map((i) => {
          return (
            <FormControlLabel
              key={i.id}
              value={i.id}
              control={<Radio />}
              label={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                    mt: 2,
                    border: " 1px solid #00838D",
                    borderRadius: "10px",
                    p: 2,
                    maxHeight: "300px",
                    minWidth: "300px",
                  }}
                  className="ratioBox"
                >
                  {i.image !== null && (
                    <Box>
                      <img
                        src={i.image}
                        alt={i.nameEn}
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    </Box>
                  )}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography color="#00838D" variant="h6">
                      {language === "am"
                        ? i?.nameAm
                        : language === "ru"
                        ? i?.nameRu
                        : language === "en"
                        ? i?.nameEn
                        : i?.nameGe}
                    </Typography>

                    <TooltipPrice data={i.price + "" + "$"} />
                  </Box>
                </Box>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
