import PageHeader from "@/components/admin/ui/PageHeader";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import MenuManagementPanel from "@/components/admin/menus/MenuManagementPanel";
import QuickActionGrid from "@/components/admin/menus/QuickActionGrid";
import MenuCategories from "@/components/admin/menus/MenuCategories";

export default function MenuPage() {
  const menuStats = [
        {
           label:"Total Menu Items", value:"248" ,    change:"+8.4%",  positive:true ,
        },
        {
          label:"Active Items"   ,  value:"216"    , change:"+12.4%", positive:true ,
        } ,
        {
          label:"Disabled Items" ,  value:"32"  ,    change:"+12.4%", positive:false
        },
        {
          label:"Total Menu Value" ,value:"£18,650" ,change:"+12.4%", positive:true
        }
      ]

  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">

      {/* Header */}

      <PageHeader title="Menu"  subtitle="Track Total orders, total revenue, avg order value, phone orders count." />

      <MetricCardsRow metricCards={menuStats} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-6">

        {/* LEFT — Menu Management */}
        <MenuManagementPanel />

        {/* RIGHT */}
        <MenuCategories />
      </div>

      {/* Bottom Action Cards */}
      <QuickActionGrid />
    </div>
  );
}