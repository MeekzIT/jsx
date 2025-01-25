// src/components/LanguageSwitcher.tsx
import React, { useState } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getCurrentCurrency } from "../../store/slices/constructorSlice";
const CurrencySwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentCurrency } = useAppSelector((state) => state.constr);
  const [currency, setCurrency] = useState(currentCurrency);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
    dispatch(getCurrentCurrency(event.target.value));
    localStorage.setItem("currency", event.target.value);
  };

  return (
    <FormControl
      variant="standard"
      size="small"
      style={{ minWidth: 100, margin: "0 10px" }}
    >
      <Select
        value={currency}
        onChange={handleLanguageChange}
        label="Language"
        startAdornment={
          <PriceChangeIcon
            sx={{
              color: "#008496",
              marginRight: "8px",
              padding: "10px",
            }}
          />
        }
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          color: "#008496",
          border: "none",
          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          ".MuiSvgIcon-root": {
            color: "#008496",
          },
        }}
      >
        <MenuItem value="en">$</MenuItem>
        <MenuItem value="am">֏</MenuItem>
        <MenuItem value="ru">₽</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrencySwitcher;
