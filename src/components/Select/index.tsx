import { useState } from 'react';

import styles from './styles.module.scss';

type OptionsProps = {
    id: number;
    description: string;
}

type SelectComponentProps = {
    placeholder: string;
    optionsProps: OptionsProps[];
}

export default function SelectComponent({ placeholder, optionsProps }: SelectComponentProps) {
  const [selected, setSeletected] = useState<number | null>(null);

  const handleChange = (event: any) => {
    setSeletected(event.target.value as number);
  };

  return (
    <select className={styles.selectContainer} onChange={handleChange}>
        <option value="" disabled selected>{placeholder}</option>
        {optionsProps.map(option => <option value={option.id}>{option.description}</option>)}
    </select>
  );
}
