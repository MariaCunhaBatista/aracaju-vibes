import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { events } from "@/data";
import { Calendar, MapPin, Ticket } from "lucide-react";

export const Route = createFileRoute("/shows")({
  component: ShowsPage,
  head: () => ({
    meta: [
      { title: "Shows e Eventos em Aracaju — Compre seu ingresso" },
      { name: "description", content: "Forró, sertanejo, pagode e festivais em Aracaju. Compre ingressos com QR Code dinâmico." },
    ],
  }),
});

function ShowsPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Hub de entretenimento"
        title="Shows & Eventos"
        description="A agenda cultural de Aracaju em tempo real. Reserve seu lugar nos melhores espetáculos da capital."
      />

      <section className="mx-auto max-w-7xl px-4 mt-10 grid gap-5 md:grid-cols-2">
        {events.map((e, i) => (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 220, damping: 24, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-3xl bg-card shadow-soft hover:shadow-elevated transition-shadow"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <motion.img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover" whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 200, damping: 25 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 via-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-gradient-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-accent">{e.category}</span>
              <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between text-primary-foreground">
                <div>
                  <div className="text-xs font-medium opacity-90">{e.artist}</div>
                  <h3 className="text-xl font-bold tracking-tight">{e.title}</h3>
                </div>
                <div className="glass-strong rounded-2xl px-3 py-2 text-center min-w-[64px]">
                  <div className="text-[10px] font-semibold uppercase tracking-wider opacity-90">{e.date.split(" ")[1]}</div>
                  <div className="text-xl font-bold leading-none">{e.date.split(" ")[0]}</div>
                </div>
              </div>
            </div>

            <div className="p-5 flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{e.date} • {e.time}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">A partir de</div>
                <div className="text-lg font-bold text-primary">{e.price === 0 ? "Gratuito" : `R$ ${e.price}`}</div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <Link
                to="/checkout/$eventId"
                params={{ eventId: e.id }}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-shadow"
              >
                <Ticket className="h-4 w-4" /> Comprar ingresso
              </Link>
            </div>
          </motion.article>
        ))}
      </section>
    </Layout>
  );
}
