import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Heart, User } from "lucide-react";

const links = [
  { to: "/", label: "Início" },
  { to: "/restaurantes", label: "Restaurantes" },
  { to: "/bares", label: "Bares" },
  { to: "/praias", label: "Praias" },
  { to: "/pontos-turisticos", label: "Pontos Turísticos" },
  { to: "/shows", label: "Shows" },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="sticky top-0 z-50 hidden md:block"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3 shadow-soft">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight">Aracaju</div>
              <div className="text-[10px] font-medium text-muted-foreground tracking-[0.18em] uppercase">Turismo</div>
            </div>
          </Link>

          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="relative rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-gradient-primary shadow-soft"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={active ? "text-primary-foreground" : ""}>{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link to="/favoritos" className="grid h-9 w-9 place-items-center rounded-xl hover:bg-secondary transition-colors">
              <Heart className="h-4 w-4" />
            </Link>
            <Link to="/login" className="grid h-9 w-9 place-items-center rounded-xl bg-secondary hover:bg-secondary/70 transition-colors">
              <User className="h-4 w-4 text-primary-deep" />
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
