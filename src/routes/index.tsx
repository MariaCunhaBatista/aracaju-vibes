import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, MapPin, Waves, UtensilsCrossed, Ticket } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PlaceCard } from "@/components/site/PlaceCard";
import { highlights, attractions, images } from "@/data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Aracaju Turismo — Praias, Cultura e Experiências em Sergipe" },
      { name: "description", content: "Tudo o que você precisa para viver Aracaju como ninguém. Descubra praias, restaurantes e os melhores shows." },
    ],
  }),
});

const quick = [
  { to: "/praias", label: "Praias", icon: Waves },
  { to: "/restaurantes", label: "Gastronomia", icon: UtensilsCrossed },
  { to: "/pontos-turisticos", label: "Pontos turísticos", icon: MapPin },
  { to: "/shows", label: "Shows", icon: Ticket },
] as const;

function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative px-4 pt-4 md:pt-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-elevated">
          <img src={images.heroOrla} alt="Orla de Atalaia ao pôr do sol" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />

          <div className="relative px-6 py-16 md:px-16 md:py-32 text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                <Sparkles className="h-3 w-3" /> Capital do Sol
              </span>
              <h1 className="mt-5 text-5xl md:text-7xl font-bold tracking-tight leading-[1.02]">
                Sinta Aracaju<br />
                <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">como ela merece</span>.
              </h1>
              <p className="mt-5 max-w-xl text-base md:text-lg text-white/85">
                Roteiros, gastronomia e cultura em um só lugar. As melhores experiências de Sergipe à distância de um clique.
              </p>

              <motion.form
                onSubmit={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 22 }}
                className="mt-8 flex items-center gap-2 rounded-2xl glass-strong p-2 max-w-xl shadow-glow"
              >
                <div className="flex flex-1 items-center gap-2 px-3">
                  <Search className="h-4 w-4 text-white/70" />
                  <input
                    placeholder="Buscar destinos, praias, restaurantes..."
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/60 outline-none py-2"
                  />
                </div>
                <button className="rounded-xl bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-accent hover:opacity-95 active:scale-95 transition-all">
                  Explorar
                </button>
              </motion.form>

              <div className="mt-8 flex flex-wrap gap-2">
                {quick.map((q) => {
                  const I = q.icon;
                  return (
                    <Link key={q.to} to={q.to} className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                      <I className="h-4 w-4" /> {q.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-7xl px-4 mt-20 md:mt-28">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Em destaque</span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
              Experiências <span className="text-gradient">imperdíveis</span>
            </h2>
          </div>
          <Link to="/pontos-turisticos" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
            Ver tudo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <PlaceCard
              key={h.id}
              id={h.id}
              title={h.title}
              subtitle={h.subtitle}
              image={h.image}
              badge={h.tag}
            />
          ))}
        </div>
      </section>

      {/* Recomendações */}
      <section className="mx-auto max-w-7xl px-4 mt-20 md:mt-28">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Recomendado para você</span>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
            Mais amados <span className="text-gradient">pelos viajantes</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.slice(0, 6).map((a) => (
            <PlaceCard
              key={a.id}
              id={a.id}
              title={a.name}
              subtitle={a.category}
              image={a.image}
              address={a.price}
              hours={a.hours}
              rating={4.7}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 mt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 md:p-16 text-primary-foreground shadow-glow">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Planeje sua viagem em minutos.</h2>
            <p className="mt-4 text-white/85">Salve favoritos, compre ingressos e organize seu roteiro perfeito por Aracaju.</p>
            <Link to="/login" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/95 text-primary-deep px-6 py-3 font-semibold shadow-soft hover:bg-white transition-colors">
              Criar conta grátis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
