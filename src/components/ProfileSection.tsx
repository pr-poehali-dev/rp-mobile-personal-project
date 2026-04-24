import { AdminUser, AccessLevel } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface ProfileSectionProps {
  user: AdminUser;
  balance: number;
  level: number;
  xp: number;
  hoursPlayed: number;
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

const serverIcon: Record<string, string> = {
  dubai: "🌴 Дубай",
  almaty: "🏔️ Алматы",
  tolyatti: "🏭 Тольятти",
};

const XP_PER_LEVEL = 1000;

export default function ProfileSection({ user, balance, level, xp, hoursPlayed }: ProfileSectionProps) {
  const xpForNext = XP_PER_LEVEL;
  const xpPct = Math.min(100, Math.round((xp / xpForNext) * 100));

  const activity = [
    { action: "Активировал промокод RPMOBILE2025", time: "5 мин назад", icon: "Gift" },
    { action: "Купил скин «Паша Техник»", time: "1 ч назад", icon: "ShoppingCart" },
    { action: "Выполнил 5 рейсов дальнобойщика", time: "3 ч назад", icon: "Truck" },
    { action: "Достиг 8-го уровня", time: "Вчера, 20:14", icon: "Star" },
    { action: "Получил военный билет", time: "Вчера, 18:00", icon: "FileText" },
  ];

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
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-lg">{roleIcon[user.role]}</span>
              <span className={`text-sm font-rubik px-2.5 py-0.5 rounded-full border ${roleBadge[user.role]}`}>
                {roleLabel[user.role]}
              </span>
              {user.server && (
                <span className="text-xs font-rubik text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                  {serverIcon[user.server] ?? user.server}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/30 text-xs font-rubik">Баланс</div>
            <div className="font-rajdhani font-bold text-xl text-green-400">₽{balance.toLocaleString("ru-RU")}</div>
          </div>
        </div>

        {/* Level bar */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-rajdhani font-bold text-xs">
                {level}
              </div>
              <span className="text-white/60 text-sm font-rubik">Уровень {level}</span>
            </div>
            <span className="text-white/30 text-xs font-rubik">{xp} / {xpForNext} XP</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-700"
              style={{ width: `${xpPct}%` }}
            />
          </div>
          <div className="text-white/25 text-xs font-rubik mt-1">До следующего уровня: {xpForNext - xp} XP</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Уровень", value: String(level), icon: "Star", color: "text-yellow-400" },
          { label: "Часов в игре", value: hoursPlayed.toLocaleString(), icon: "Clock", color: "text-cyan-400" },
          { label: "Баланс ₽", value: balance.toLocaleString("ru-RU"), icon: "DollarSign", color: "text-green-400" },
          { label: "Военный билет", value: "Выдан", icon: "FileText", color: "text-purple-400" },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-white/8 bg-card p-4 text-center">
            <Icon name={stat.icon} fallback="Circle" size={18} className={`${stat.color} mx-auto mb-2`} />
            <div className="font-rajdhani font-bold text-lg text-white">{stat.value}</div>
            <div className="text-white/30 text-xs font-rubik mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Hours milestone */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">🕐</span>
          <div>
            <div className="font-rajdhani font-bold text-white text-sm">Цель: 10 000 часов = +₽1 000 доната</div>
            <div className="text-white/30 text-xs font-rubik">Наиграй 10 000 часов и получи бонус автоматически</div>
          </div>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: `${Math.min(100, (hoursPlayed / 10000) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-rubik mt-1">
          <span className="text-white/30">{hoursPlayed.toLocaleString()} ч</span>
          <span className="text-white/30">10 000 ч</span>
        </div>
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
            { label: "Позывной", value: user.name },
            { label: "Допуск", value: "Уровень Альфа" },
            { label: "Дата выдачи", value: new Date().toLocaleDateString("ru-RU") },
            { label: "Сервер", value: serverIcon[user.server ?? "dubai"] ?? "—" },
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
