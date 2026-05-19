import MetricCard, { IMetricCard } from "../ui/MetricCard";


export default function MetricCardsRow({ metricCards , grid="4" }: { metricCards: IMetricCard[] , grid?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${grid} gap-4`}>
      {metricCards.map((card) => (
        <MetricCard key={card.label} card={card} />
      ))}
    </div>
  );
}