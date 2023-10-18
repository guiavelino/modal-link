import { Button } from "@mui/material";
import Link from "next/link";

import styles from '../styles/Login.module.scss';
import Input from "@/components/Input";

export default function Login() {
  const submit = () => {}
  
  return (
    <main className={styles.loginContainer}>
      <h1>Entre ou cadastre-se</h1>

      <form onSubmit={submit}>
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
        />

        <Input
          type="password"
          placeholder="Senha"
          name="password"
        />

        <Button variant="contained" className={styles.submitButton}>Entrar</Button>
      </form>

      <p>
        Não possui uma conta? <Link href="/cadastre-se">Cadastre-se</Link>
      </p>
    </main>
  )
}
