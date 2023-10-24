import { Backdrop, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import Input from "@/components/Input";
import styles from './styles.module.scss';
import { cpfMask } from "@/helpers/mask";
import { validateCPF, validateEmail } from "@/helpers/validations";

export default function SignUp() {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateFields = (): boolean => name.length > 0 && lastName.length > 0 && cpf.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0;
  
  const validatePassword = (): boolean => password === confirmPassword;
  
  const validate = (): boolean => {
    if (!validateFields()) {
      setError("Preencha todos os campos.");
    } else if (!validateCPF(cpf)) {
      setError("CPF inválido.");
    } else if (!validateEmail(email)) {
      setError("E-mail inválido.");
    } else if (!validatePassword()) {
      setError("As senhas devem ser iguais.");
    } else {
      setError(null);
      return true;
    }

    return false;
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ name, lastName, cpf, email, password })
    });

    const data = await response.json();

    if (response.status === 201) {
      const response = await signIn('credentials', { redirect: false, email, password });

      if (response?.status === 200) {
        push('/solicitacoes');
      }
    } else {
      setError(data.message);
      setLoading(false);
    }
  }
  
  return (
    <main className={styles.signUpContainer}>
      <h1>Cadastre-se</h1>

      <form onSubmit={submit}>
        <Input
          type="text"
          placeholder="Nome"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Sobrenome"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        
        <Input
          type="text"
          placeholder="CPF"
          name="cpf"
          value={cpf}
          onChange={(e) => setCpf(cpfMask(e.target.value))}
          required
          maxLength={14}
        />
        
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className={styles.passwordContainer}>
            <Input
                type="password"
                placeholder="Senha"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Input
                type="password"
                placeholder="Confirmar Senha"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
        </div>

        <Button 
          type="submit"
          variant="contained" 
          className={styles.submitButton}
        >
          Cadastre-se
        </Button>
      </form>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <footer>
        <p>
          Já possui uma conta? <Link href="/">Entrar</Link>
        </p>
      </footer>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </main>
  )
}
