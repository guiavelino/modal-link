import React from "react";
import { FormControl, FormControlOwnProps, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

import styles from "./styles.module.scss";

type InputProps = {
  icon?: React.ReactNode;
  edge?: "start" | "end" | false;
  position?: "start" | "end";
  variant?: FormControlOwnProps["variant"];
  inputOnClick?: React.MouseEventHandler<HTMLInputElement>;
  iconOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  readOnly?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  type,
  placeholder,
  name,
  icon,
  onChange,
  inputOnClick,
  iconOnClick,
  edge = "end",
  position = "end",
  value,
  id,
  variant = "outlined",
  readOnly,
}: InputProps) {
  return (
    <FormControl variant={variant}>
      <InputLabel htmlFor={name} className={styles.inputLabel}>
        {placeholder}
      </InputLabel>
      <OutlinedInput
        id={id}
        endAdornment={
          icon ? (
            <InputAdornment position={position}>
              <IconButton onClick={iconOnClick} edge={edge}>
                {icon}
              </IconButton>
            </InputAdornment>
          ) : null
        }
        label={placeholder}
        className={styles.inputContainer}
        type={type}
        onChange={onChange}
        value={value}
        onClick={inputOnClick}
        readOnly={readOnly}
      />
    </FormControl>
  );
}
