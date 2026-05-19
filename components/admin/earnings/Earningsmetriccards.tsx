"use client";

import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react";
import MetricCard from "../ui/MetricCard";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface MetricCardData {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  note?: string; // e.g. "Labor + COGS"
}

interface EarningsMetricCardsProps {
  cards: MetricCardData[];
}

// ─────────────────────────────────────────────
// Default data matching the design
// ─────────────────────────────────────────────

export const defaultMetricCards: MetricCardData[] = [
  { label: "Total Revenue",    value: "£12,450", change: "+12.8%", positive: true },
  { label: "Net Profit %",     value: "24.2%",   change: "+2.1%",  positive: true },
  { label: "Net Profit %",     value: "24.2%",   change: "+2.1%",  positive: true },
  { label: "Delivery Fee %",   value: "14.8%",   change: "-0.8%",  positive: false },
  { label: "Cost %",           value: "32.4%",   change: "+5.4%",  positive: false, note: "Labor + COGS" },
];

// ─────────────────────────────────────────────
// EarningsMetricCards
// ─────────────────────────────────────────────

export default function EarningsMetricCards({ cards = defaultMetricCards }: Partial<EarningsMetricCardsProps>) {
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {cards.map((card, i) => (
        <MetricCard key={i} card={card} />
      ))}
    </div>
  );
}
