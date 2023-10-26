import { Backdrop, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import styles from './styles.module.scss';
import Input from "@/components/Input";

export default function Login() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await signIn('credentials', { redirect: false, email, password });

    if (response?.status === 200) {
      setError(null);
      push('/solicitacoes');
    } else {
      setError("E-mail ou senha inválidos.");
    }

    setLoading(false);
  }
  
  return (
    <main className={styles.loginContainer}>
      <h1>Entre ou cadastre-se</h1>

      <form onSubmit={submit}>
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" className={styles.submitButton}>Entrar</Button>
        
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>

      <p>
        Não possui uma conta? <Link href="/cadastre-se">Cadastre-se</Link>
      </p>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </main>
  )
}
