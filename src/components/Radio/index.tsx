import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({ setRadio }: any) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">O veículo possui carga?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Sim" control={<Radio onClick={() => setRadio(true)} />} label="Sim" />
        <FormControlLabel value="Não" control={<Radio onClick={() => setRadio(false)} />} label="Não" />
      </RadioGroup>
    </FormControl>
  );
}
