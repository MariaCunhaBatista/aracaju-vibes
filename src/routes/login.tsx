import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { Mail, Lock, User } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Entrar — Aracaju Turismo" }] }),
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <Layout>
      <div className="mx-auto max-w-md px-4 pt-10 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="rounded-3xl bg-card shadow-soft p-7"
        >
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">{mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{mode === "login" ? "Acesse seus favoritos e ingressos" : "Comece a explorar Aracaju agora"}</p>
          </div>

          <div className="mt-6 flex rounded-xl bg-secondary p-1">
            {(["login", "signup"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className="relative flex-1 rounded-lg py-2 text-sm font-semibold">
                {mode === m && <motion.span layoutId="auth-pill" className="absolute inset-0 -z-10 rounded-lg bg-card shadow-soft" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className={mode === m ? "text-primary-deep" : "text-muted-foreground"}>{m === "login" ? "Entrar" : "Cadastrar"}</span>
              </button>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-3">
            {mode === "signup" && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input placeholder="Seu nome" className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" placeholder="seu@email.com" className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="password" placeholder="Senha" className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <button className="w-full rounded-xl bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-glow">
              {mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Ao continuar, você aceita os <Link to="/" className="text-primary font-semibold">Termos</Link>.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
