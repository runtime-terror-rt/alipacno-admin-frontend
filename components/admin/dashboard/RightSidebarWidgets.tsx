import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import OperationalAlertsWidget from "./RightSidebarWidgets/OperationalAlertsWidget";
import ProfitSummaryWidget from "./RightSidebarWidgets/ProfitSummaryWidget";
import NewCampaignPulseWidget from "./RightSidebarWidgets/NewCampaignPulseWidget";
import InfrastructureSyncWidget from "./RightSidebarWidgets/InfrastructureSyncWidget";


export default function RightSidebarWidgets() {
  return (
    <aside className="w-full xl:w-[260px] min-w-0 shrink-0 flex flex-col gap-4">
      <OperationalAlertsWidget />

      <ProfitSummaryWidget />

      <NewCampaignPulseWidget />

      <InfrastructureSyncWidget />
    </aside>
  );
}

