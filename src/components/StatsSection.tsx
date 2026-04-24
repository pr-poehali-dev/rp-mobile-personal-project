import Icon from "@/components/ui/icon";

const stats = [
  { label: "Онлайн игроков", value: "247", icon: "Users", color: "cyan", delta: "+12" },
  { label: "Активных фракций", value: "18", icon: "Shield", color: "purple", delta: "+2" },
  { label: "Донатов сегодня", value: "₽84,200", icon: "DollarSign", color: "green", delta: "+18%" },
  { label: "Военных билетов", value: "1,340", icon: "FileText", color: "orange", delta: "+34" },
];

const cities = [
  { name: "Москва / Кремль", players: 89, icon: "🏛️", color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/20" },
  { name: "Арзамас", players: 43, icon: "🏙️", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
  { name: "Лыткарино", players: 31, icon: "🌆", color: "from-green-500/20 to-teal-500/20", border: "border-green-500/20" },
  { name: "Дубай", players: 57, icon: "🌴", color: "from-amber-500/20 to-yellow-500/20", border: "border-amber-500/20" },
  { name: "Тольятти", players: 27, icon: "🏭", color: "from-slate-500/20 to-gray-500/20", border: "border-slate-500/20" },
];

const colorMap: Record<string, string> = {
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  green: "text-green-400 bg-green-500/10 border-green-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

export default function StatsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-rajdhani font-bold text-2xl text-white tracking-wide">Статистика сервера</h2>
        <p className="text-white/40 text-sm font-rubik mt-1">Актуальные данные в реальном времени</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        {stats.map((stat) => (
          <div key={stat.label} className={`border-neon rounded-xl p-4 bg-card animate-fade-in-up`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${colorMap[stat.color]}`}>
                <Icon name={stat.icon} fallback="Circle" size={16} />
              </div>
              <span className="text-green-400 text-xs font-rubik font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
                {stat.delta}
              </span>
            </div>
            <div className="font-rajdhani font-bold text-2xl text-white">{stat.value}</div>
            <div className="text-white/40 text-xs font-rubik mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Cities */}
      <div>
        <h3 className="font-rajdhani font-semibold text-lg text-white/80 mb-3 tracking-wide">Активность по городам</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 stagger">
          {cities.map((city) => {
            const max = 100;
            const pct = Math.round((city.players / max) * 100);
            return (
              <div key={city.name} className={`rounded-xl border ${city.border} bg-gradient-to-br ${city.color} p-4 animate-fade-in-up`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{city.icon}</span>
                  <div>
                    <div className="font-rajdhani font-bold text-white text-base">{city.name}</div>
                    <div className="text-white/50 text-xs font-rubik">{city.players} игроков онлайн</div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/40 rounded-full transition-all duration-1000"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity feed */}
      <div>
        <h3 className="font-rajdhani font-semibold text-lg text-white/80 mb-3 tracking-wide">Последние события</h3>
        <div className="space-y-2">
          {[
            { text: "Игрок Volkov_23 получил военный билет", time: "1 мин назад", icon: "FileText", color: "text-cyan-400" },
            { text: "Новый донат: VIP Premium — ₽2,500", time: "3 мин назад", icon: "DollarSign", color: "text-green-400" },
            { text: "ОПГ «Северные» набрала 5 новых бойцов", time: "7 мин назад", icon: "Users", color: "text-purple-400" },
            { text: "Правительство Арзамаса сменило Мэра", time: "15 мин назад", icon: "Shield", color: "text-orange-400" },
            { text: "Военная часть провела учения в Тольятти", time: "28 мин назад", icon: "Swords", color: "text-red-400" },
          ].map((ev, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
              <Icon name={ev.icon} fallback="Circle" size={14} className={ev.color} />
              <span className="text-white/70 text-sm font-rubik flex-1">{ev.text}</span>
              <span className="text-white/25 text-xs font-rubik shrink-0">{ev.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
