import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Achievement {
  id: string;
  title: string;
  desc: string;
  reward: number;
  icon: string;
  done: boolean;
  progress: number;
  max: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "trucker", title: "Дальнобойщик", desc: "Выполни 8 рейсов", reward: 800, icon: "🚛", done: false, progress: 5, max: 8 },
  { id: "lvl8", title: "Уровень 8", desc: "Достигни 8-го уровня", reward: 800, icon: "⭐", done: true, progress: 8, max: 8 },
  { id: "hours10k", title: "Ветеран", desc: "Наиграй 10 000 часов", reward: 1000, icon: "🕐", done: false, progress: 347, max: 10000 },
];

function getTimeOfDay(hour: number): { label: string; icon: string; sky: string; gradient: string } {
  if (hour >= 5 && hour < 8)   return { label: "Рассвет",  icon: "🌅", sky: "from-orange-900/40 to-pink-900/20",   gradient: "text-orange-300" };
  if (hour >= 8 && hour < 17)  return { label: "День",     icon: "☀️",  sky: "from-blue-900/40 to-cyan-900/20",    gradient: "text-yellow-300" };
  if (hour >= 17 && hour < 20) return { label: "Закат",    icon: "🌇", sky: "from-orange-900/50 to-red-900/20",   gradient: "text-orange-400" };
  if (hour >= 20 && hour < 23) return { label: "Вечер",    icon: "🌆", sky: "from-indigo-900/50 to-purple-900/20", gradient: "text-indigo-300" };
  return                               { label: "Ночь",     icon: "🌙", sky: "from-slate-900/60 to-blue-950/30",   gradient: "text-blue-300" };
}

function getRestartInfo(now: Date): { isRestart: boolean; nextRestart: string; countdown: string } {
  const h = now.getHours();
  const m = now.getMinutes();
  const totalMin = h * 60 + m;
  const restartStart = 4 * 60;      // 04:00
  const restartEnd = 4 * 60 + 30;  // 04:30

  if (totalMin >= restartStart && totalMin < restartEnd) {
    const remaining = restartEnd - totalMin;
    return { isRestart: true, nextRestart: "04:30", countdown: `${remaining} мин` };
  }

  let minsUntil = restartStart - totalMin;
  if (minsUntil < 0) minsUntil += 24 * 60;
  const hh = Math.floor(minsUntil / 60);
  const mm = minsUntil % 60;
  return {
    isRestart: false,
    nextRestart: "04:00",
    countdown: hh > 0 ? `${hh}ч ${mm}м` : `${mm} мин`,
  };
}

interface GameBarProps {
  balance: number;
  lams: number;
  onAchievementClaim: (reward: number) => void;
}

export default function GameBar({ balance, lams, onAchievementClaim }: GameBarProps) {
  const [now, setNow] = useState(new Date());
  const [showAchievements, setShowAchievements] = useState(false);
  const [claimed, setClaimed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const tod = getTimeOfDay(now.getHours());
  const restart = getRestartInfo(now);

  const gameHour = (now.getHours() + now.getMinutes() / 60);
  const sunPos = Math.max(5, Math.min(95, ((gameHour / 24) * 100)));

  const handleClaim = (ach: Achievement) => {
    if (ach.done && !claimed.has(ach.id)) {
      setClaimed(prev => new Set(prev).add(ach.id));
      onAchievementClaim(ach.reward);
    }
  };

  return (
    <>
      {/* Achievements popup */}
      {showAchievements && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-96 z-50 animate-fade-in-up">
          <div className="rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-rajdhani font-bold text-white text-base">Достижения</h3>
              <button onClick={() => setShowAchievements(false)} className="text-white/40 hover:text-white/80">
                <Icon name="X" fallback="Circle" size={16} />
              </button>
            </div>
            {ACHIEVEMENTS.map(ach => {
              const isClaimed = claimed.has(ach.id);
              const pct = Math.min(100, Math.round((ach.progress / ach.max) * 100));
              return (
                <div key={ach.id} className={`rounded-xl border p-3 ${ach.done ? "border-yellow-500/30 bg-yellow-500/5" : "border-white/8 bg-white/3"}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ach.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-rajdhani font-bold text-white text-sm">{ach.title}</span>
                        {ach.done && <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-1.5 py-0.5 rounded-full font-rubik">Выполнено!</span>}
                      </div>
                      <div className="text-white/40 text-xs font-rubik">{ach.desc}</div>
                      <div className="mt-1.5 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="text-white/25 text-xs font-rubik mt-0.5">{ach.progress.toLocaleString()} / {ach.max.toLocaleString()}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-green-400 font-rajdhani font-bold text-sm">+{ach.reward}₽</div>
                      {ach.done && !isClaimed && (
                        <button
                          onClick={() => handleClaim(ach)}
                          className="mt-1 text-xs font-rubik text-black bg-yellow-400 hover:bg-yellow-300 px-2 py-0.5 rounded-lg transition-colors"
                        >
                          Забрать
                        </button>
                      )}
                      {isClaimed && <span className="text-white/30 text-xs font-rubik">Получено</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-14 border-t border-white/5 bg-black/70 backdrop-blur-xl">
        {/* Sky gradient strip */}
        <div className={`absolute inset-0 bg-gradient-to-r ${tod.sky} opacity-60 pointer-events-none`} />

        {/* Sun/Moon indicator */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-300 shadow-lg transition-all duration-1000"
            style={{ left: `${sunPos}%` }}
          />
        </div>

        <div className="flex items-center h-full px-4 gap-6">
          {/* Time of day */}
          <div className="flex items-center gap-2">
            <span className="text-lg">{tod.icon}</span>
            <div>
              <div className={`font-rajdhani font-bold text-sm ${tod.gradient}`}>{tod.label}</div>
              <div className="text-white/30 text-xs font-rubik leading-none">
                {now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
            </div>
          </div>

          <div className="w-px h-6 bg-white/10" />

          {/* Restart */}
          <div className="flex items-center gap-2">
            {restart.isRestart ? (
              <>
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <div>
                  <div className="text-red-400 font-rajdhani font-bold text-xs">ПЕРЕЗАГРУЗКА</div>
                  <div className="text-white/40 text-xs font-rubik">осталось {restart.countdown}</div>
                </div>
              </>
            ) : (
              <>
                <Icon name="RefreshCw" fallback="Circle" size={13} className="text-white/30" />
                <div>
                  <div className="text-white/50 font-rubik text-xs">Рестарт в {restart.nextRestart}</div>
                  <div className="text-white/25 text-xs font-rubik">через {restart.countdown}</div>
                </div>
              </>
            )}
          </div>

          <div className="w-px h-6 bg-white/10" />

          {/* Achievements button */}
          <button
            onClick={() => setShowAchievements(!showAchievements)}
            className="flex items-center gap-2 hover:bg-white/5 px-2 py-1 rounded-lg transition-colors"
          >
            <span className="text-base">🏆</span>
            <div>
              <div className="text-white/60 text-xs font-rubik">Достижения</div>
              <div className="text-yellow-400 text-xs font-rajdhani font-bold">
                {ACHIEVEMENTS.filter(a => a.done).length}/{ACHIEVEMENTS.length}
              </div>
            </div>
          </button>

          <div className="ml-auto flex items-center gap-2">
            {/* Lams */}
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-1.5">
              <span className="text-sm">🐑</span>
              <div>
                <div className="text-white/30 text-xs font-rubik leading-none">Ламы</div>
                <div className="font-rajdhani font-bold text-yellow-400 text-sm leading-none">
                  {lams.toLocaleString("ru-RU")}
                </div>
              </div>
            </div>
            {/* Balance */}
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5">
              <Icon name="DollarSign" fallback="Circle" size={13} className="text-green-400" />
              <div>
                <div className="text-white/30 text-xs font-rubik leading-none">Баланс</div>
                <div className="font-rajdhani font-bold text-green-400 text-sm leading-none">
                  ₽{balance.toLocaleString("ru-RU")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}