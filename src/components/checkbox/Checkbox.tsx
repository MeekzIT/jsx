import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, ReactNode, useState } from "react";
import { IConstuctorItemOptions } from "../../store/types";
import { useTranslation } from "react-i18next";
import TooltipPrice from "../tooltip/Tooltip";
// import Tooltip from "../tooltip/Tooltip";

interface CheckboxBoxProps {
  name: string | ReactNode;
  options: IConstuctorItemOptions[];
  onChange: (value: number[]) => void; // Changed the value type to number[]
}

export default function CheckboxBox({
  name,
  options,
  onChange,
}: CheckboxBoxProps) {
  const { i18n } = useTranslation();
  const language = i18n.language;

  // State to keep track of selected checkbox values
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const numericValue = Number(value); // Convert the value to a number

    let updatedSelectedValues: number[];

    // Add or remove the value from the selected array
    if (checked) {
      updatedSelectedValues = [...selectedValues, numericValue];
    } else {
      updatedSelectedValues = selectedValues.filter(
        (selected) => selected !== numericValue
      );
    }

    setSelectedValues(updatedSelectedValues);
    onChange(updatedSelectedValues); // Pass updated values back to the parent
  };

  return (
    <FormControl sx={{ ml: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{name}</FormLabel>
      <FormGroup>
        {options.map((i) => {
          return (
            <FormControlLabel
              key={i.id}
              control={
                <Checkbox
                  value={i.id}
                  onChange={handleCheckboxChange}
                  checked={selectedValues.includes(i.id)} // Maintain checked state
                />
              }
              label={
                <Tooltip
                  title={
                    <>
                      <Typography>
                        {" "}
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
      </FormGroup>
    </FormControl>
  );
}
