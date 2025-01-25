import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import { ChangeEvent, ReactNode, useState } from "react";
import {
  IConstuctorItemOptionItemOptions,
  IConstuctorItemOptions,
} from "../../store/types";
import { useTranslation } from "react-i18next";
import TooltipPrice from "../tooltip/Tooltip";

interface CheckboxBoxProps {
  name: string | ReactNode;
  options: IConstuctorItemOptions[] | IConstuctorItemOptionItemOptions[];
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
      <FormLabel sx={{ ml: 3 }}>
        <Typography variant="h5" color="#008496" mb={1} mt={1}>
          {name}
        </Typography>
        <Divider />
      </FormLabel>
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                    mt: 2,
                    border: " 1px solid #008496",
                    borderRadius: "10px",
                    p: 2,
                  }}
                  className="ratioBox"
                >
                  {i.image !== null && (
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
                        ? i?.nameAm
                        : language === "ru"
                        ? i?.nameRu
                        : language === "en"
                        ? i?.nameEn
                        : i?.nameGe}
                    </Typography>

                    <TooltipPrice data={i.price} />
                  </Box>
                </Box>
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
