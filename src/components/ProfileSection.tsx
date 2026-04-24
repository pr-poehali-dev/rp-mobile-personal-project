import { AdminUser, AccessLevel } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface ProfileSectionProps {
  user: AdminUser;
}

const roleColors: Record<AccessLevel, string> = {
  owner: "from-cyan-500 to-blue-600",
  admin: "from-purple-500 to-indigo-600",
  moderator: "from-green-500 to-teal-600",
};

const roleBadge: Record<AccessLevel, string> = {
  owner: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
  admin: "bg-purple-500/20 text-purple-400 border-purple-500/40",
  moderator: "bg-green-500/20 text-green-400 border-green-500/40",
};

const roleLabel: Record<AccessLevel, string> = {
  owner: "Владелец проекта",
  admin: "Администратор",
  moderator: "Модератор",
};

const roleIcon: Record<AccessLevel, string> = {
  owner: "👑",
  admin: "🛡️",
  moderator: "⚖️",
};

const activity = [
  { action: "Выдал VIP Gold игроку NightBoss", time: "14 мин назад", icon: "DollarSign" },
  { action: "Обновил настройки сервера", time: "2 ч назад", icon: "Settings" },
  { action: "Создал фракцию «Автозаводские»", time: "Вчера, 21:34", icon: "Users" },
  { action: "Забанил игрока Cheater_88", time: "Вчера, 19:02", icon: "Shield" },
  { action: "Выдал военный билет: 24 шт.", time: "2 дня назад", icon: "FileText" },
];

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="font-rajdhani font-bold text-2xl text-white tracking-wide">Профиль</h2>

      {/* Profile card */}
      <div className="rounded-xl border border-white/8 bg-card p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${roleColors[user.role]} flex items-center justify-center text-2xl font-rajdhani font-bold text-black shadow-lg`}>
              {user.avatar}
            </div>
            {user.online && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-background flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-900 animate-pulse" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-rajdhani font-bold text-xl text-white">{user.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{roleIcon[user.role]}</span>
              <span className={`text-sm font-rubik px-2.5 py-0.5 rounded-full border ${roleBadge[user.role]}`}>
                {roleLabel[user.role]}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-white/30 text-xs font-rubik">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              В сети
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Дней на сервере", value: "342", icon: "Calendar" },
          { label: "Действий выполнено", value: "2,841", icon: "Activity" },
          { label: "Выдано билетов", value: "487", icon: "FileText" },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-white/8 bg-card p-4 text-center">
            <Icon name={stat.icon} fallback="Circle" size={18} className="text-cyan-400 mx-auto mb-2" />
            <div className="font-rajdhani font-bold text-xl text-white">{stat.value}</div>
            <div className="text-white/30 text-xs font-rubik mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Military ticket */}
      <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-5">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="FileText" fallback="Circle" size={18} className="text-cyan-400" />
          <h3 className="font-rajdhani font-semibold text-white/80 text-base tracking-wide">Военный билет</h3>
          <span className="ml-auto text-xs font-rubik text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">Выдан</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm font-rubik">
          {[
            { label: "Серия / Номер", value: "РП-2024-00001" },
            { label: "Звание", value: "Владелец" },
            { label: "Дата выдачи", value: "01.01.2024" },
            { label: "Допуск", value: "Уровень Альфа" },
          ].map(row => (
            <div key={row.label}>
              <div className="text-white/30 text-xs mb-0.5">{row.label}</div>
              <div className="text-white">{row.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <h3 className="font-rajdhani font-semibold text-lg text-white/80 mb-3 tracking-wide">История действий</h3>
        <div className="space-y-2">
          {activity.map((act, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/3 border border-white/5">
              <Icon name={act.icon} fallback="Circle" size={14} className="text-cyan-400/70 shrink-0" />
              <span className="text-white/70 text-sm font-rubik flex-1">{act.action}</span>
              <span className="text-white/25 text-xs font-rubik shrink-0">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
