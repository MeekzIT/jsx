import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  IConstuctorItemOptionItemOptions,
  IConstuctorItemOptions,
} from "../../store/types";
import { useTranslation } from "react-i18next";
import TooltipPrice from "../tooltip/Tooltip";

interface RadioBoxProps {
  name: string;
  defaultValue: number | undefined | null;
  options: IConstuctorItemOptions[] | IConstuctorItemOptionItemOptions[];
  onChange: (value: string, hasItems?: true) => void;
}

function isIConstuctorItemOptions(
  option: IConstuctorItemOptions | IConstuctorItemOptionItemOptions
): option is IConstuctorItemOptions {
  return (option as IConstuctorItemOptions).ConstuctorOptionItems !== undefined;
}

export default function RadioBox({
  name,
  options,
  defaultValue,
  onChange,
}: RadioBoxProps) {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const [selectedValue, setSelectedValue] = useState<number | undefined | null>(
    defaultValue
  );

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = options.find(
      (i) => i.id === Number(event.target.value)
    );

    if (selectedOption && isIConstuctorItemOptions(selectedOption)) {
      if (selectedOption.ConstuctorOptionItems?.length > 0) {
        onChange(event.target.value, true);
      } else {
        onChange(event.target.value);
      }
    } else {
      onChange(event.target.value);
    }

    setSelectedValue(Number(event.target.value));
  };

  return (
    <FormControl sx={{ ml: 3 }}>
      <FormLabel sx={{ ml: 3 }}>
        <Typography variant="h5" color="#008496">
          {name}
        </Typography>
      </FormLabel>
      <RadioGroup
        value={selectedValue}
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
                  border: "1px solid #008496",
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
                        width: i?.width + "px" || "100px",
                        height: i?.height + "px" || "100px",
                      }}
                    />
                  </Box>
                )}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography color="#008496" variant="h6">
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
