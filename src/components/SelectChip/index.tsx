import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import styles from "./styles.module.scss";

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

type SelectChipProps = {
  placeholder: string;
  options: string[];
  id?: string;
};

export default function MultipleSelectChip({ placeholder, options, id = "select-chip" }: SelectChipProps) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl>
      <InputLabel id="multiple-chip-label" className={styles.inputLabel}>
        {placeholder}
      </InputLabel>
      <Select
        labelId="multiple-chip-label"
        id={id}
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={styles.chip} />
            ))}
          </Box>
        )}
        className={styles.selectChipContainer}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} style={getStyles(option, personName, theme)}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
