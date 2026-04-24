import { Section, AccessLevel, AdminUser } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  user: AdminUser;
  balance: number;
}

const navItems: { id: Section; label: string; icon: string; allowedRoles: AccessLevel[]; badge?: string }[] = [
  { id: "stats",    label: "Статистика",  icon: "BarChart3",   allowedRoles: ["owner", "admin", "moderator"] },
  { id: "teams",    label: "Команды",     icon: "Users",       allowedRoles: ["owner", "admin", "moderator"] },
  { id: "shop",     label: "Магазин",     icon: "ShoppingCart",allowedRoles: ["owner", "admin", "moderator"], badge: "NEW" },
  { id: "promo",    label: "Промокоды",   icon: "Gift",        allowedRoles: ["owner", "admin", "moderator"] },
  { id: "donates",  label: "Донаты",      icon: "DollarSign",  allowedRoles: ["owner", "admin"] },
  { id: "settings", label: "Настройки",  icon: "Settings",    allowedRoles: ["owner"] },
  { id: "profile",  label: "Профиль",    icon: "User",        allowedRoles: ["owner", "admin", "moderator"] },
];

const roleColors: Record<AccessLevel, string> = {
  owner: "text-cyan-400",
  admin: "text-purple-400",
  moderator: "text-green-400",
};

const roleLabels: Record<AccessLevel, string> = {
  owner: "Владелец 👑",
  admin: "Администратор",
  moderator: "Модератор",
};

export default function Sidebar({ activeSection, onSectionChange, user, balance }: SidebarProps) {
  const accessibleItems = navItems.filter(item => item.allowedRoles.includes(user.role));

  return (
    <aside className="w-64 h-full flex flex-col bg-black/40 border-r border-white/5 backdrop-blur-xl relative shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center glow-cyan animate-float shrink-0">
            <span className="font-rajdhani font-bold text-black text-sm">RP</span>
          </div>
          <div>
            <h1 className="font-rajdhani font-bold text-white text-xl leading-none tracking-wider">
              RP MOBILE
            </h1>
            <p className="text-white/30 text-xs mt-0.5 font-rubik">3 сервера открыты</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {accessibleItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${isActive
                  ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400"
                  : "text-white/50 hover:text-white/90 hover:bg-white/5 border border-transparent"
                }
              `}
            >
              <div className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-cyan-400" : ""}`}>
                <Icon name={item.icon} fallback="Circle" size={17} />
              </div>
              <span className="font-rubik font-medium text-sm flex-1 text-left">{item.label}</span>
              {item.badge && !isActive && (
                <span className="text-xs font-rubik text-cyan-400 bg-cyan-500/15 border border-cyan-500/25 px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Balance mini */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/8 border border-green-500/15">
          <Icon name="DollarSign" fallback="Circle" size={13} className="text-green-400 shrink-0" />
          <div className="min-w-0">
            <div className="text-white/25 text-xs font-rubik leading-none">Баланс</div>
            <div className="font-rajdhani font-bold text-green-400 text-sm leading-tight truncate">
              ₽{balance.toLocaleString("ru-RU")}
            </div>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/5">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold text-xs font-rajdhani">
              {user.avatar}
            </div>
            {user.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-background" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate font-rubik">{user.name}</p>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-rubik truncate ${roleColors[user.role]}`}>
                {roleLabels[user.role]}
              </span>
              {user.server && (
                <span className="text-white/25 text-xs font-rubik shrink-0">
                  {user.server === "dubai" ? "🌴" : user.server === "almaty" ? "🏔️" : "🏭"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
    </aside>
  );
}
