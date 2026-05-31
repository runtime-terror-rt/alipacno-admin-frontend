import { MapPin, Megaphone, ShoppingBasket, TrendingDown, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AiStats {
    label: string;
    sublabel: string;
    tag: string;
    value: string | number;
    change: string; 
    positive: boolean; 
    sub?: string; 
    icon?: React.ReactNode;
    image?: string;
    subline : string;
}

function HeroCard({
  card,
}: {card: AiStats}) {
  const { label, sublabel, tag,subline,  value, change, positive, sub, icon , image } = card;
  return (
    <div className="relative bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-4 overflow-hidden flex-1 min-w-[120px]">
        <div className="absolute  right-0 top-0 w-20 h-32 " >
            <Image src="/admin/common/stats.svg" alt="Decorative arc" layout="fill" objectFit="cover" className="" />
        </div>
        <div className="absolute right-0 top-6 w-40 h-20 bg">
        <div className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-sm font-bold border-[2px] mb-2 bg-[#E5DEDA0D] border-[#FFFFFF41]`}>
          <ShoppingBasket className="mr-1" size={20} /> {tag}
        </div>
        </div>
     
      <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-[#f9671a]/20 blur-2xl pointer-events-none" />
      <div className="relative"> 
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-base text-white font-bold tracking-wide">{label}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-base text-primary font-bold tracking-wide">{sublabel}</span>
        </div>
        <div className="flex items-center gap-2">
          {image && <Image src={image} alt="Decorative arc" width={200} height={200} className="w-20 h-20 rounded-full object-cover " />}
          {icon && <div className="w-20 h-20 bg-[#07060380] rounded-full">{icon}</div>}
          <div>
            <p className="text-xl font-black text-white">{value.toLocaleString()}</p>
            <p className="text-[#626262] text-base">{subline}</p>
             <div className="flex items-center gap-1.5 mt-2 ">
                <span className={`flex items-center gap-0.5 text-[12px] font-semibold ${positive ? "text-[#00A706]" : "text-red-400"}`}>
                {positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />} {change}
                </span>
                <span className="text-[10px] text-zinc-500">vs last Week</span>
              </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}

const AiStats = () => {
    const [ aiStats, setAiStats ] = useState<AiStats[]>([
        { label: "Top Sold Product", 
          sublabel: "Burger Combo Deluxe",    
          tag: "High Demand",     
          value: 1248,  
          change: "+12.4%", 
          positive: true, 
          image: "/admin/food/burger.jpg",
          subline: "Orders"
        },
        { label: "Top Ordering Area", 
          sublabel: "Downtown",    
          tag: "Strong Growth",  
          value: "Downtown", 
          sub: "2,856 orders",  
          change: "+5.4%", 
          positive: true, 
          subline: "Orders",
          icon: <MapPin size={18} className=" text-center justify-center  text-[#f9671a]  mx-auto mt-5 w-8 h-8 " />
        },
        { label: "Most Loyal Customer", 
          sublabel: "William Smith",  
          tag: "VIP Customer",   
          value: "William Smith", 
          sub: "36 orders",  
          change: "+12.4%", 
          positive: true, 
          subline: "Orders",
          image: '/admin/avatar/William.jpg'
        },
        { label: "Best Campaign", 
          sublabel:"Burger Night Promo",        
          tag: "Top Performer",    
          value: 4582,  
          change: "+22%", 
          positive: true, 
          icon: <Megaphone size={18} className=" text-center justify-center  text-[#f9671a]  mx-auto mt-5 w-8 h-8 " />,
          sub: "Burger Night Promo" ,
          subline: "Reached",
        },
    ])

  return (
    <div className="flex gap-3 flex-wrap">
        {
            aiStats.map((card) => (
                <HeroCard key={card.label} card={card} />
            ))
        }
      </div>
  )
}

export default AiStats
