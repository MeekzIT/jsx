// src/components/LanguageSwitcher.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language"; // Importing the icon

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <FormControl
      variant="standard"
      size="small"
      style={{ minWidth: 100, margin: "0 10px" }}
    >
      <Select
        value={currentLanguage}
        onChange={handleLanguageChange}
        label="Language"
        startAdornment={
          <LanguageIcon
            sx={{
              color: "#00838D",
              marginRight: "8px",
              padding: "10px",
            }}
          />
        }
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          color: "#00838D",
          border: "none",
          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          ".MuiSvgIcon-root": {
            color: "#00838D",
          },
        }}
      >
        <MenuItem value="ru">RU</MenuItem>
        <MenuItem value="am">AM</MenuItem>
        <MenuItem value="en">EN</MenuItem>
        <MenuItem value="ge">GE</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
