import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import styles from "./styles.module.scss";

type TextAreaProps = {
  placeholder?: string;
};

export default function TextArea({ placeholder }: TextAreaProps = { placeholder: "" }) {
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
        id="outlined-multiline-static"
        placeholder={placeholder}
        multiline
        rows={4}
      />
    </Box>
  );
}
