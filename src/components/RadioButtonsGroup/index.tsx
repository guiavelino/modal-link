import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import styles from "./styles.module.scss";

type RadioButtonsGroupProps = {
  formLabel: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  FormControlLabelChildren: FormControlLabelProps[];
};

export default function RadioButtonsGroup({ formLabel, onChange, FormControlLabelChildren }: RadioButtonsGroupProps) {
  return (
    <FormControl>
      <FormLabel className={styles.formLabel} id="demo-row-radio-buttons-group-label">
        {formLabel}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChange}
      >
        {FormControlLabelChildren.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio size="small" className={styles.radioIcon} />}
            label={item.label}
            className={styles.formControlLabel}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
