import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, children } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ p: 2 }}>
      <Box
        sx={{
          // width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          // width: "900px",
        }}
      >
        <CloseIcon
          sx={{ color: "#00838D", cursor: "pointer", pr: 2, pt: 1 }}
          onClick={handleClose}
        />
      </Box>
      {children}
    </Dialog>
  );
}
