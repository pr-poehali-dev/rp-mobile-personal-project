import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function SettingsSection() {
  const [serverName, setServerName] = useState("RP MOBILE | Official");
  const [maxPlayers, setMaxPlayers] = useState("500");
  const [welcomeMsg, setWelcomeMsg] = useState("Добро пожаловать на RP MOBILE! Получите военный билет и выберите путь.");
  const [militaryAuto, setMilitaryAuto] = useState(true);
  const [donateEnabled, setDonateEnabled] = useState(true);
  const [pvpEnabled, setPvpEnabled] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-rajdhani font-bold text-2xl text-white tracking-wide">Настройки сервера</h2>
        <p className="text-white/40 text-sm font-rubik mt-1">Только для Владельца проекта</p>
      </div>

      {/* Server settings */}
      <div className="rounded-xl border border-white/8 bg-card p-5 space-y-4">
        <h3 className="font-rajdhani font-semibold text-white/80 text-base tracking-wide flex items-center gap-2">
          <Icon name="Server" fallback="Circle" size={16} className="text-cyan-400" />
          Основные параметры
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-white/50 text-xs font-rubik mb-1.5 block">Название сервера</label>
            <input
              value={serverName}
              onChange={e => setServerName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-rubik focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs font-rubik mb-1.5 block">Максимум игроков</label>
            <input
              value={maxPlayers}
              onChange={e => setMaxPlayers(e.target.value)}
              type="number"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-rubik focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs font-rubik mb-1.5 block">Приветственное сообщение</label>
            <textarea
              value={welcomeMsg}
              onChange={e => setWelcomeMsg(e.target.value)}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-rubik focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="rounded-xl border border-white/8 bg-card p-5 space-y-4">
        <h3 className="font-rajdhani font-semibold text-white/80 text-base tracking-wide flex items-center gap-2">
          <Icon name="ToggleLeft" fallback="Circle" size={16} className="text-purple-400" />
          Игровые механики
        </h3>
        <div className="space-y-3">
          {[
            { label: "Автовыдача военного билета при входе", desc: "Игрок сразу получает билет и может устроиться", value: militaryAuto, set: setMilitaryAuto, color: "cyan" },
            { label: "Донат-магазин активен", desc: "Игроки могут покупать VIP-привилегии", value: donateEnabled, set: setDonateEnabled, color: "green" },
            { label: "PvP между фракциями", desc: "Разрешить боевые столкновения на территориях", value: pvpEnabled, set: setPvpEnabled, color: "red" },
          ].map((toggle) => (
            <div key={toggle.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <div className="text-white text-sm font-rubik">{toggle.label}</div>
                <div className="text-white/30 text-xs font-rubik mt-0.5">{toggle.desc}</div>
              </div>
              <button
                onClick={() => toggle.set(!toggle.value)}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                  toggle.value
                    ? toggle.color === "red" ? "bg-red-500/60" : toggle.color === "green" ? "bg-green-500/60" : "bg-cyan-500/60"
                    : "bg-white/10"
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow ${toggle.value ? "left-6" : "left-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Access levels */}
      <div className="rounded-xl border border-white/8 bg-card p-5 space-y-3">
        <h3 className="font-rajdhani font-semibold text-white/80 text-base tracking-wide flex items-center gap-2">
          <Icon name="ShieldCheck" fallback="Circle" size={16} className="text-yellow-400" />
          Уровни доступа
        </h3>
        {[
          { role: "Владелец (Owner)", icon: "👑", perms: ["Все настройки", "Управление доступом", "Финансы", "Банн/Кик"], color: "border-yellow-500/30 bg-yellow-500/5" },
          { role: "Администратор (Admin)", icon: "🛡️", perms: ["Управление игроками", "Донат-магазин", "Фракции", "Просмотр статистики"], color: "border-purple-500/30 bg-purple-500/5" },
          { role: "Модератор (Moderator)", icon: "⚖️", perms: ["Чат-модерация", "Мут/Варн", "Просмотр статистики"], color: "border-green-500/30 bg-green-500/5" },
        ].map((lvl) => (
          <div key={lvl.role} className={`rounded-lg border ${lvl.color} p-3`}>
            <div className="flex items-center gap-2 mb-2">
              <span>{lvl.icon}</span>
              <span className="font-rajdhani font-semibold text-white text-sm">{lvl.role}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {lvl.perms.map(p => (
                <span key={p} className="text-xs font-rubik text-white/50 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-rubik font-medium text-sm transition-all duration-300 ${
          saved
            ? "bg-green-500/20 border border-green-500/40 text-green-400"
            : "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30"
        }`}
      >
        <Icon name={saved ? "Check" : "Save"} fallback="Circle" size={15} />
        {saved ? "Сохранено!" : "Сохранить настройки"}
      </button>
    </div>
  );
}
