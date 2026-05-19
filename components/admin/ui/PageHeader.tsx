export default function PageHeader({
    title = "HQ Overview",
    subtitle = "All branches · Real-time performance",
  }: {
    title?: string;
    subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[28px] font-bold text-white">{title}</h1>
      <p className="text-[#626262] text-[14px]">
        {subtitle}
      </p>
    </div>
  );
}