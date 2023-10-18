import { Button } from "@mui/material";
import Link from "next/link";

import Input from "@/components/Input";
import styles from './styles.module.scss';

export default function SignUp() {
  const submit = () => {}
  
  return (
    <main className={styles.signUpContainer}>
      <h1>Cadastre-se</h1>

      <form onSubmit={submit}>
        <Input
          type="text"
          placeholder="Nome"
          name="name"
        />

        <Input
          type="text"
          placeholder="Sobrenome"
          name="lastName"
        />
        
        <Input
          type="text"
          placeholder="CPF"
          name="cpf"
        />
        
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
        />

        <div className={styles.passwordContainer}>
            <Input
                type="password"
                placeholder="Senha"
                name="password"
            />

            <Input
                type="password"
                placeholder="Confirmar Senha"
                name="confirmPassword"
            />
        </div>

        <Button variant="contained" className={styles.submitButton}>Cadastre-se</Button>
      </form>

      <p>
        Já possui uma conta? <Link href="/">Entrar</Link>
      </p>
    </main>
  )
}
