import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { attractions } from "@/data";
import { MapPin, X } from "lucide-react";

export const Route = createFileRoute("/mapa")({
  component: MapPage,
  head: () => ({ meta: [{ title: "Mapa de Aracaju — Pontos Turísticos Interativos" }] }),
});

function MapPage() {
  const [active, setActive] = useState<string | null>(null);
  const point = attractions.find((a) => a.id === active);

  // Normalize coords to map bounds
  const lats = attractions.map((a) => a.coords.lat);
  const lngs = attractions.map((a) => a.coords.lng);
  const minLat = Math.min(...lats) - 0.02;
  const maxLat = Math.max(...lats) + 0.02;
  const minLng = Math.min(...lngs) - 0.02;
  const maxLng = Math.max(...lngs) + 0.02;

  return (
    <Layout>
      <PageHeader eyebrow="Explore" title="Mapa de Aracaju" description="Veja os principais pontos turísticos no mapa e planeje seu roteiro." />

      <section className="mx-auto max-w-7xl px-4 mt-8">
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-elevated bg-gradient-to-br from-primary-deep via-primary to-primary-deep">
          {/* Decorative grid */}
          <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>

          {/* Coast curve */}
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M 0,30 Q 30,10 60,35 T 100,50 L 100,60 L 0,60 Z" fill="oklch(0.72 0.16 295 / 0.25)" />
            <path d="M 0,40 Q 40,20 70,45 T 100,55" stroke="oklch(0.82 0.13 295)" strokeWidth="0.3" fill="none" />
          </svg>

          {/* Pins */}
          {attractions.map((a) => {
            const x = ((a.coords.lng - minLng) / (maxLng - minLng)) * 100;
            const y = ((maxLat - a.coords.lat) / (maxLat - minLat)) * 100;
            return (
              <motion.button
                key={a.id}
                onClick={() => setActive(a.id)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: Math.random() * 0.4 }}
                whileHover={{ scale: 1.2 }}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
              >
                <span className="absolute inset-0 -m-2 rounded-full bg-accent/40 animate-ping" />
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-accent shadow-accent">
                  <MapPin className="h-4 w-4 text-accent-foreground" />
                </span>
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full glass-strong px-2 py-0.5 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity text-foreground">
                  {a.name}
                </span>
              </motion.button>
            );
          })}

          {/* Popup */}
          <AnimatePresence>
            {point && (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:max-w-sm glass-strong rounded-2xl p-4 shadow-elevated"
              >
                <button onClick={() => setActive(null)} className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-secondary">
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="flex gap-3">
                  <img src={point.image} alt={point.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{point.category}</span>
                    <h3 className="font-bold text-sm leading-tight">{point.name}</h3>
                    <div className="mt-1 text-xs text-muted-foreground">{point.hours} • {point.price}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}
