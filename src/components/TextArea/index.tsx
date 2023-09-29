import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import styles from "./styles.module.scss";

type TextAreaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export default function TextArea({ placeholder, onChange, value }: TextAreaProps) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        className={styles.textArea}
        placeholder={placeholder}
        multiline
        rows={4}
        value={value}
        onChange={onChange}
        InputProps={{
          className: styles.multilineField,
        }}
      />
    </Box>
  );
}
