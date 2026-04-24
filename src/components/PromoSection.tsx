import { useState } from "react";
import Icon from "@/components/ui/icon";

const VALID_CODES: Record<string, { reward: number; desc: string; used?: boolean }> = {
  "RPMOBILE2025":  { reward: 5000,   desc: "Промо запуска проекта" },
  "DUBAI777":      { reward: 10000,  desc: "Дубай — первый сервер" },
  "ALMATY2025":    { reward: 7500,   desc: "Открытие Алматы" },
  "TOLYATTI":      { reward: 3000,   desc: "Тольятти всегда в строю" },
  "VOENBILYET":    { reward: 2000,   desc: "За получение военного билета" },
  "PASHA100":      { reward: 15000,  desc: "Секретный код Паши Техника" },
  "OWNER777":      { reward: 200000, desc: "Код Владельца проекта 👑" },
};

interface PromoSectionProps {
  balance: number;
  onPromo: (amount: number) => void;
}

export default function PromoSection({ balance, onPromo }: PromoSectionProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "used">("idle");
  const [lastReward, setLastReward] = useState(0);
  const [usedCodes, setUsedCodes] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<{ code: string; reward: number; time: string }[]>([]);

  const handleActivate = () => {
    const upper = code.trim().toUpperCase();
    if (!upper) return;

    if (usedCodes.has(upper)) {
      setStatus("used");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }

    const promo = VALID_CODES[upper];
    if (!promo) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }

    setUsedCodes(prev => new Set(prev).add(upper));
    setLastReward(promo.reward);
    setStatus("success");
    onPromo(promo.reward);
    setHistory(prev => [{
      code: upper,
      reward: promo.reward,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    }, ...prev]);
    setCode("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="font-rajdhani font-bold text-2xl text-white tracking-wide">Промокоды</h2>
        <p className="text-white/40 text-sm font-rubik mt-1">Введи код — получи донат на баланс</p>
      </div>

      {/* Balance */}
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
          <Icon name="DollarSign" fallback="Circle" size={18} className="text-green-400" />
        </div>
        <div>
          <div className="text-white/40 text-xs font-rubik">Текущий баланс</div>
          <div className="font-rajdhani font-bold text-2xl text-green-400">₽{balance.toLocaleString("ru-RU")}</div>
        </div>
      </div>

      {/* Input */}
      <div className="rounded-xl border border-white/8 bg-card p-5 space-y-4">
        <h3 className="font-rajdhani font-semibold text-white/80 text-base">Активировать промокод</h3>

        <div className="flex gap-3">
          <input
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && handleActivate()}
            placeholder="RPMOBILE2025"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-rajdhani text-lg tracking-widest focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20 uppercase"
          />
          <button
            onClick={handleActivate}
            disabled={!code.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-rajdhani font-bold tracking-wider hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Применить
          </button>
        </div>

        {/* Status messages */}
        {status === "success" && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500/15 border border-green-500/30 animate-fade-in-up">
            <span className="text-xl">🎉</span>
            <div>
              <div className="text-green-400 font-rajdhani font-bold">Промокод активирован!</div>
              <div className="text-white/50 text-xs font-rubik">+₽{lastReward.toLocaleString()} зачислено на баланс</div>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/15 border border-red-500/30 animate-fade-in-up">
            <Icon name="X" fallback="Circle" size={16} className="text-red-400" />
            <div className="text-red-400 font-rubik text-sm">Промокод не найден или истёк</div>
          </div>
        )}
        {status === "used" && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500/15 border border-orange-500/30 animate-fade-in-up">
            <Icon name="AlertCircle" fallback="Circle" size={16} className="text-orange-400" />
            <div className="text-orange-400 font-rubik text-sm">Этот промокод уже был использован</div>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <h3 className="font-rajdhani font-semibold text-lg text-white/80 mb-3 tracking-wide">История активаций</h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/3 border border-white/5">
                <span className="text-lg">🎁</span>
                <div className="flex-1">
                  <div className="font-rajdhani font-bold text-white text-sm tracking-wider">{h.code}</div>
                  <div className="text-white/30 text-xs font-rubik">{h.time}</div>
                </div>
                <div className="text-green-400 font-rajdhani font-bold">+₽{h.reward.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      <div className="rounded-xl border border-white/5 bg-white/2 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Info" fallback="Circle" size={14} className="text-white/30" />
          <span className="text-white/30 text-xs font-rubik">Где найти промокоды?</span>
        </div>
        <ul className="space-y-1 text-white/25 text-xs font-rubik">
          <li>• В официальных анонсах сервера</li>
          <li>• За достижения и активность на проекте</li>
          <li>• В Discord / Telegram администрации</li>
          <li>• При покупке VIP-привилегий</li>
        </ul>
      </div>
    </div>
  );
}