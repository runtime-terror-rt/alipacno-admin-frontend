import { AlertTriangle, CircleGauge } from "lucide-react";
import { JSX } from "react";
import { Alert } from "../dashboard/RightSidebarWidgets/OperationalAlertsWidget";

const alertIcons: Record<Alert["type"], JSX.Element> = {
  error: <AlertTriangle size={24} />,
  warning: <AlertTriangle size={24} />,
  info: <CircleGauge size={24} />,
};

const alertBorderStyles: Record<Alert["type"], string> = {
  error: "border-l-[#E59595]",
  warning: "border-l-[#FFB95F]",
  info: "border-l-[#3B82F6]",
};

const alertIconStyles: Record<Alert["type"], string> = {
  error: "text-[#E59595]",
  warning: "text-[#FBBF24]",
  info: "text-[#3B82F6]",
};


export default function AlertItem({ alert }: { alert: Alert }) {
  return (
    <div
      className={`border-l-3 pl-3 flex space-y-2 gap-0.5 rounded-xl shadow-[#FFB4AB30] py-2 shadow-sm ${alertBorderStyles[alert.type]}`}
    >
        <div className={`flex pt-2 pr-1 gap-2 ${alertIconStyles[alert.type]}`}>
          {alertIcons[alert.type]}
        </div>
      <div className={`flex flex-col  items-center gap-2 ${alertIconStyles[alert.type]}`}>
        <p className="text-[12px] font-semibold">{alert.title}</p>
        <p className="text-[#626262] text-[11px] leading-snug">{alert.description}</p>
      </div>
    </div>
  );
}