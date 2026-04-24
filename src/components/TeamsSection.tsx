import { useState } from "react";
import Icon from "@/components/ui/icon";

type FractionType = "military" | "opg" | "government" | "civil";

interface Fraction {
  id: string;
  name: string;
  type: FractionType;
  city: string;
  members: number;
  maxMembers: number;
  leader: string;
  icon: string;
  color: string;
  borderColor: string;
  description: string;
}

const fractions: Fraction[] = [
  {
    id: "army",
    name: "Военная часть №7",
    type: "military",
    city: "Тольятти",
    members: 34,
    maxMembers: 60,
    leader: "General_Petrov",
    icon: "⚔️",
    color: "from-slate-700/40 to-slate-600/20",
    borderColor: "border-slate-500/30",
    description: "Элитные вооружённые силы. Защита государства и порядка.",
  },
  {
    id: "kremlin",
    name: "Правительство (Кремль)",
    type: "government",
    city: "Москва / Кремль",
    members: 12,
    maxMembers: 20,
    leader: "President_Volkov",
    icon: "🏛️",
    color: "from-yellow-700/30 to-yellow-600/10",
    borderColor: "border-yellow-500/30",
    description: "Высший орган власти. Управляет всеми городами.",
  },
  {
    id: "gov_arzamas",
    name: "Администрация Арзамаса",
    type: "government",
    city: "Арзамас",
    members: 8,
    maxMembers: 15,
    leader: "Mayor_Sidorov",
    icon: "🏙️",
    color: "from-blue-700/30 to-blue-600/10",
    borderColor: "border-blue-500/30",
    description: "Местное самоуправление. Хозяйство и законы города.",
  },
  {
    id: "gov_lytkaryno",
    name: "Мэрия Лыткарино",
    type: "government",
    city: "Лыткарино",
    members: 6,
    maxMembers: 12,
    leader: "Mayor_Kozlov",
    icon: "🌆",
    color: "from-teal-700/30 to-green-600/10",
    borderColor: "border-teal-500/30",
    description: "Управляет инфраструктурой и экономикой Лыткарино.",
  },
  {
    id: "dubai_corp",
    name: "Корпорация Dubai Elite",
    type: "civil",
    city: "Дубай",
    members: 21,
    maxMembers: 40,
    leader: "Sheikh_Rashid",
    icon: "🌴",
    color: "from-amber-700/30 to-yellow-600/10",
    borderColor: "border-amber-500/30",
    description: "Бизнес-империя. Торговля, роскошь и влияние.",
  },
  {
    id: "opg_severnye",
    name: "ОПГ «Северные»",
    type: "opg",
    city: "Москва",
    members: 28,
    maxMembers: 50,
    leader: "Boss_Nikitin",
    icon: "🔫",
    color: "from-red-800/30 to-red-700/10",
    borderColor: "border-red-500/30",
    description: "Криминальная группировка. Контроль территорий.",
  },
  {
    id: "opg_tolyatti",
    name: "ОПГ «Автозаводские»",
    type: "opg",
    city: "Тольятти",
    members: 19,
    maxMembers: 40,
    leader: "Don_Marchenko",
    icon: "🚗",
    color: "from-orange-800/30 to-red-700/10",
    borderColor: "border-orange-500/30",
    description: "Промышленная мафия. Авто-рынок под прикрытием.",
  },
];

const typeLabels: Record<FractionType, string> = {
  military: "Военные",
  opg: "ОПГ",
  government: "Правительство",
  civil: "Гражданские",
};

const typeBadge: Record<FractionType, string> = {
  military: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  opg: "bg-red-500/20 text-red-400 border-red-500/30",
  government: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  civil: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const filters: { id: FractionType | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "military", label: "Военные" },
  { id: "opg", label: "ОПГ" },
  { id: "government", label: "Правительство" },
  { id: "civil", label: "Гражданские" },
];

export default function TeamsSection() {
  const [filter, setFilter] = useState<FractionType | "all">("all");

  const filtered = filter === "all" ? fractions : fractions.filter(f => f.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-rajdhani font-bold text-2xl text-white tracking-wide">Команды и фракции</h2>
          <p className="text-white/40 text-sm font-rubik mt-1">{fractions.length} активных организаций</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-sm font-rubik hover:bg-cyan-500/25 transition-colors">
          <Icon name="Plus" fallback="Circle" size={14} />
          Новая фракция
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-rubik transition-all duration-200 border ${
              filter === f.id
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger">
        {filtered.map((fr) => {
          const pct = Math.round((fr.members / fr.maxMembers) * 100);
          return (
            <div key={fr.id} className={`rounded-xl border ${fr.borderColor} bg-gradient-to-br ${fr.color} backdrop-blur p-5 animate-fade-in-up group cursor-pointer hover:scale-[1.02] transition-transform duration-200`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{fr.icon}</span>
                  <div>
                    <h3 className="font-rajdhani font-bold text-white text-base leading-tight">{fr.name}</h3>
                    <div className="flex items-center gap-1 text-white/40 text-xs font-rubik mt-0.5">
                      <Icon name="MapPin" fallback="Circle" size={10} />
                      {fr.city}
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-rubik px-2 py-0.5 rounded-full border ${typeBadge[fr.type]}`}>
                  {typeLabels[fr.type]}
                </span>
              </div>

              <p className="text-white/40 text-xs font-rubik mb-4 leading-relaxed">{fr.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-rubik">
                  <span className="text-white/50">Состав</span>
                  <span className="text-white/80">{fr.members} / {fr.maxMembers}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs font-rubik text-white/40">
                <Icon name="Crown" fallback="Circle" size={11} />
                <span>{fr.leader}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
