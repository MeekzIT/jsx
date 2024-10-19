import {
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
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cuurent = options.find((i) => i.id == event.target.value);
    if (cuurent?.ConstuctorOptionItems?.length > 0) {
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
                <Tooltip
                  title={
                    <>
                      <Typography>
                        {language === "am"
                          ? i?.descAm
                          : language === "ru"
                          ? i?.descRu
                          : language === "en"
                          ? i?.descEn
                          : i?.descGe}
                      </Typography>
                    </>
                  }
                  arrow
                  placement="top" // You can change this to "bottom", "left", or "right"
                >
                  {language === "am"
                    ? i?.nameAm
                    : language === "ru"
                    ? i?.nameRu
                    : language === "en"
                    ? i?.nameEn
                    : i?.nameGe}
                  <TooltipPrice data={i.price + "" + "$"} />
                </Tooltip>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
