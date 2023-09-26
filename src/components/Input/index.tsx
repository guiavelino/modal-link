import React from "react";
import { FormControl, FormControlOwnProps, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

import styles from "./styles.module.scss";

type InputProps = {
  type: string;
  placeholder: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  icon?: React.ReactNode;
  edge?: "start" | "end" | false;
  position?: "start" | "end";
  value?: string;
  variant?: FormControlOwnProps["variant"];
};

export default function Input({
  type,
  placeholder,
  name,
  icon,
  onChange,
  edge = "end",
  position = "end",
  value,
  id,
  variant = "outlined",
}: InputProps) {
  return (
    <FormControl variant={variant}>
      <InputLabel htmlFor={name}>{placeholder}</InputLabel>
      <OutlinedInput
        id={id}
        endAdornment={
          <InputAdornment position={position}>
            <IconButton
              //   onClick={handleClickGetLocalization}
              edge={edge}
            >
              {icon}
            </IconButton>
          </InputAdornment>
        }
        label={placeholder}
        className={styles.inputContainer}
        type={type}
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
}
