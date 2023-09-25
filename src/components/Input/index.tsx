import styles from './styles.module.scss';

type InputProps = {
    type: string;
    placeholder: string;
    name: string;
    icon?: any;
}

export default function Input({ type, placeholder, name, icon }: InputProps) {

    return (
        <input
            type={type}
            placeholder={placeholder} 
            name={name}
            className={styles.inputContainer}
        />
    );
}