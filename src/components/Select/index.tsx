import { useState } from "react";

import styles from "./styles.module.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type OptionsProps = {
  id: number;
  description: string;
};

type SelectComponentProps = {
  placeholder: string;
  optionsProps: OptionsProps[];
  id?: string;
  selected?: number | string;
  setSelected: (value: number) => void;
};

export default function SelectComponent({
  placeholder,
  optionsProps,
  id = "select",
  selected = "",
  setSelected,
}: SelectComponentProps) {
  const handleChange = (event: any) => {
    setSelected(event.target.value as number);
  };

  return (
    <FormControl>
      <InputLabel id="select-label" className={styles.inputLabel}>
        {placeholder}
      </InputLabel>
      <Select
        labelId="select-label"
        id={id}
        value={selected}
        label={placeholder}
        onChange={handleChange}
        className={styles.selectContainer}
      >
        {optionsProps.map((option, idx) => (
          <MenuItem key={`menu-item-${idx}`} value={option.id}>{option.description}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
