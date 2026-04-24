import Icon from "@/components/ui/icon";

const packages = [
  { name: "VIP Bronze", price: 299, color: "from-amber-800/40 to-amber-700/20", border: "border-amber-600/30", text: "text-amber-400", icon: "🥉", perks: ["Префикс [VIP]", "x1.2 опыт", "Доп. инвентарь"] },
  { name: "VIP Silver", price: 799, color: "from-slate-600/40 to-slate-500/20", border: "border-slate-400/30", text: "text-slate-300", icon: "🥈", perks: ["Префикс [VIP+]", "x1.5 опыт", "Уникальный скин авто", "Доп. инвентарь x2"] },
  { name: "VIP Gold", price: 1499, color: "from-yellow-700/40 to-yellow-600/20", border: "border-yellow-500/30", text: "text-yellow-400", icon: "🥇", perks: ["Префикс [GOLD]", "x2 опыт", "Элитный транспорт", "Приоритетный слот", "Доп. навыки"] },
  { name: "VIP Platinum", price: 2999, color: "from-cyan-800/40 to-cyan-700/20", border: "border-cyan-500/30", text: "text-cyan-400", icon: "💎", perks: ["Префикс [PLATINUM]", "x3 опыт", "Личный особняк", "Чёрная метка", "Все бонусы Gold"] },
];

const recentDonates = [
  { player: "Volkov_23", package: "VIP Platinum", amount: 2999, time: "2 мин назад" },
  { player: "Sheikh_R", package: "VIP Gold", amount: 1499, time: "14 мин назад" },
  { player: "NightBoss", package: "VIP Silver", amount: 799, time: "31 мин назад" },
  { player: "Mayor_S", package: "VIP Bronze", amount: 299, time: "1 ч назад" },
  { player: "Don_March", package: "VIP Platinum", amount: 2999, time: "2 ч назад" },
];

export default function DonatesSection() {
  const totalToday = recentDonates.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-rajdhani font-bold text-2xl text-white tracking-wide">Донат-магазин</h2>
          <p className="text-white/40 text-sm font-rubik mt-1">Управление привилегиями игроков</p>
        </div>
        <div className="text-right">
          <div className="font-rajdhani font-bold text-2xl text-green-400">₽{totalToday.toLocaleString()}</div>
          <div className="text-white/30 text-xs font-rubik">за сегодня</div>
        </div>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        {packages.map((pkg) => (
          <div key={pkg.name} className={`rounded-xl border ${pkg.border} bg-gradient-to-b ${pkg.color} p-5 animate-fade-in-up group`}>
            <div className="text-3xl mb-3">{pkg.icon}</div>
            <h3 className={`font-rajdhani font-bold text-lg ${pkg.text} mb-1`}>{pkg.name}</h3>
            <div className="font-rajdhani text-2xl text-white font-bold">₽{pkg.price}</div>
            <div className="mt-4 space-y-1.5">
              {pkg.perks.map(perk => (
                <div key={perk} className="flex items-center gap-2 text-xs font-rubik text-white/60">
                  <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                  {perk}
                </div>
              ))}
            </div>
            <button className={`mt-4 w-full py-2 rounded-lg text-sm font-rubik font-medium border ${pkg.border} ${pkg.text} hover:bg-white/10 transition-colors`}>
              Выдать игроку
            </button>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div>
        <h3 className="font-rajdhani font-semibold text-lg text-white/80 mb-3 tracking-wide">Последние покупки</h3>
        <div className="space-y-2">
          {recentDonates.map((d, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-xs font-rajdhani font-bold text-white">
                {d.player.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-rubik font-medium">{d.player}</div>
                <div className="text-white/40 text-xs font-rubik">{d.package}</div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-rajdhani font-bold">₽{d.amount.toLocaleString()}</div>
                <div className="text-white/25 text-xs font-rubik">{d.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
