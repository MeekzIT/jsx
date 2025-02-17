import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  Tooltip,
} from "@mui/material";
import { ChangeEvent, ReactNode, useState } from "react";
import {
  IConstuctorItemOptionItemOptions,
  IConstuctorItemOptions,
} from "../../store/types";
import { useTranslation } from "react-i18next";
import TooltipPrice from "../tooltip/Tooltip";
import TextParcer from "../textParcer/TextParser";

interface CheckboxBoxProps {
  name: string | ReactNode;
  options: IConstuctorItemOptions[] | IConstuctorItemOptionItemOptions[];
  onChange: (value: number[]) => void;
}

export default function CheckboxBox({
  name,
  options,
  onChange,
}: CheckboxBoxProps) {
  const { i18n } = useTranslation();
  const defaultText = '[{"type":"paragaph","children":[{"text":""}]}]';
  const language = i18n.language;

  const firstItem = options
    .filter((item) => item.order !== undefined && item.order !== null)
    .sort((a, b) => a.order - b.order)[0];
  const defaultSelectedId = firstItem?.id ?? null;

  const [selectedValues, setSelectedValues] = useState<number[]>(
    defaultSelectedId !== null ? [] : []
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const numericValue = Number(value);

    let updatedSelectedValues: number[];

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
        {options
          .filter((item) => item.order !== undefined && item.order !== null)
          .sort((a, b) => a.order - b.order)
          .map((i) => {
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
                    {i?.descAm === defaultText ||
                    i?.descRu === defaultText ||
                    i?.descEn === defaultText ||
                    i?.descGe === defaultText ? (
                      <div>
                        {i.image !== null && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
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
                      </div>
                    ) : (
                      <Tooltip
                        sx={{
                          background: "none",
                        }}
                        title={
                          <Box p={0}>
                            {language === "am" ? (
                              i?.descAm === defaultText ? undefined : (
                                <TextParcer data={JSON.parse(i?.descAm)} />
                              )
                            ) : language === "ru" ? (
                              i?.descRu === defaultText ? undefined : (
                                <TextParcer data={JSON.parse(i?.descRu)} />
                              )
                            ) : language === "en" ? (
                              i?.descEn === defaultText ? undefined : (
                                <TextParcer data={JSON.parse(i?.descEn)} />
                              )
                            ) : i?.descGe === defaultText ? undefined : (
                              <TextParcer data={JSON.parse(i?.descGe)} />
                            )}
                            <TooltipPrice data={i.price} />
                          </Box>
                        }
                      >
                        <div>
                          {i.image !== null && (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
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
                        </div>
                      </Tooltip>
                    )}
                  </Box>
                }
              />
            );
          })}
      </FormGroup>
    </FormControl>
  );
}
