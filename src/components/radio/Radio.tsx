import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import {
  IConstuctorItemOptionItemOptions,
  IConstuctorItemOptions,
} from "../../store/types";
import { useTranslation } from "react-i18next";
import TooltipPrice from "../tooltip/Tooltip";

interface RadioBoxProps {
  name: string;
  options: IConstuctorItemOptions[] | IConstuctorItemOptionItemOptions[];
  onChange: (value: string, hasItems?: true) => void;
}

function isIConstuctorItemOptions(
  option: IConstuctorItemOptions | IConstuctorItemOptionItemOptions
): option is IConstuctorItemOptions {
  return (option as IConstuctorItemOptions).ConstuctorOptionItems !== undefined;
}

export default function RadioBox({ name, options, onChange }: RadioBoxProps) {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = options.find(
      (i) => i.id === Number(event.target.value)
    );

    if (selectedOption && isIConstuctorItemOptions(selectedOption)) {
      // If selectedOption is IConstuctorItemOptions and has items
      if (selectedOption.ConstuctorOptionItems?.length > 0) {
        onChange(event.target.value, true);
      } else {
        onChange(event.target.value);
      }
    } else {
      // Handle case for IConstuctorItemOptionItemOptions or other logic if needed
      onChange(event.target.value);
    }
  };

  return (
    <FormControl sx={{ ml: 3 }}>
      <FormLabel sx={{ ml: 3 }}>
        <Typography variant="h5" color="#00838D">
          {name}
        </Typography>
      </FormLabel>
      <RadioGroup
        defaultValue={options.length > 0 ? options[0].id : ""}
        name="radio-buttons-group"
        onChange={handleRadioChange}
      >
        {options.map((i) => (
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
                  border: "1px solid #00838D",
                  borderRadius: "10px",
                  p: 2,
                }}
                className="ratioBox"
              >
                {i.image && (
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
                      ? i.nameAm
                      : language === "ru"
                      ? i.nameRu
                      : language === "en"
                      ? i.nameEn
                      : i.nameGe}
                  </Typography>
                  <TooltipPrice data={i.price} />
                </Box>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
