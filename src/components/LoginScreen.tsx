import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginScreenProps {
  onLogin: (name: string, role: string, server: string) => void;
}

const servers = [
  {
    id: "dubai",
    name: "Дубай",
    num: "Сервер #1",
    icon: "🌴",
    desc: "Роскошь, бизнес и власть",
    color: "from-amber-500/20 to-yellow-600/10",
    border: "border-amber-500/40",
    glow: "hover:shadow-amber-500/20",
    online: 247,
    status: "online",
  },
  {
    id: "almaty",
    name: "Алматы",
    num: "Сервер #2",
    icon: "🏔️",
    desc: "Горы, торговля и интриги",
    color: "from-blue-500/20 to-cyan-600/10",
    border: "border-blue-500/40",
    glow: "hover:shadow-blue-500/20",
    online: 183,
    status: "online",
  },
  {
    id: "tolyatti",
    name: "Тольятти",
    num: "Сервер #3",
    icon: "🏭",
    desc: "Заводской город, ОПГ и улицы",
    color: "from-slate-500/20 to-gray-600/10",
    border: "border-slate-500/40",
    glow: "hover:shadow-slate-500/20",
    online: 129,
    status: "online",
  },
];

const fractionChoices = [
  { id: "military", label: "Военная часть", icon: "⚔️", desc: "Служить Родине. Дисциплина и честь.", color: "border-slate-500/40 hover:border-slate-400/60" },
  { id: "opg", label: "ОПГ", icon: "🔫", desc: "Своя игра. Власть через силу.", color: "border-red-500/40 hover:border-red-400/60" },
  { id: "government", label: "Правительство", icon: "🏛️", desc: "Управлять городом. Законы и власть.", color: "border-yellow-500/40 hover:border-yellow-400/60" },
  { id: "civil", label: "Гражданский", icon: "🏙️", desc: "Свободный путь. Бизнес и жизнь.", color: "border-blue-500/40 hover:border-blue-400/60" },
];

type Step = "server" | "login" | "ticket" | "fraction";

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<Step>("server");
  const [selectedServer, setSelectedServer] = useState("");
  const [nickname, setNickname] = useState("");
  const [selectedFraction, setSelectedFraction] = useState("");
  const [ticketNumber] = useState(() => `РП-2025-${String(Math.floor(Math.random() * 90000) + 10000)}`);

  const steps: Step[] = ["server", "login", "ticket", "fraction"];
  const stepIndex = steps.indexOf(step);

  const handleNext = () => {
    if (step === "server" && selectedServer) setStep("login");
    else if (step === "login" && nickname.trim()) setStep("ticket");
    else if (step === "ticket") setStep("fraction");
    else if (step === "fraction" && selectedFraction) onLogin(nickname, selectedFraction, selectedServer);
  };

  const selectedServerData = servers.find(s => s.id === selectedServer);

  const btnDisabled =
    (step === "server" && !selectedServer) ||
    (step === "login" && !nickname.trim()) ||
    (step === "fraction" && !selectedFraction);

  const btnLabel =
    step === "server" ? "Выбрать сервер" :
    step === "login" ? "Войти на сервер" :
    step === "ticket" ? "Забрать билет" :
    "Начать игру →";

  return (
    <div className="fixed inset-0 bg-background cyber-grid flex items-center justify-center overflow-auto py-8">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg px-4 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center glow-cyan animate-float">
              <span className="font-rajdhani font-bold text-black text-lg">RP</span>
            </div>
            <h1 className="font-rajdhani font-bold text-4xl text-white tracking-widest text-glow-cyan">MOBILE</h1>
          </div>
          <p className="text-white/30 text-sm font-rubik">Военно-ролевой проект · 3 сервера открыты</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-2 rounded-full transition-all duration-300 ${
                step === s ? "bg-cyan-400 w-8" :
                stepIndex > i ? "bg-cyan-700 w-2" :
                "bg-white/15 w-2"
              }`} />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/8 bg-card/80 backdrop-blur-xl p-6 space-y-5">

          {/* Step 0: Choose server */}
          {step === "server" && (
            <>
              <div>
                <h2 className="font-rajdhani font-bold text-xl text-white">Выберите сервер</h2>
                <p className="text-white/40 text-sm font-rubik mt-1">Все три сервера открыты прямо сейчас</p>
              </div>
              <div className="space-y-3">
                {servers.map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServer(srv.id)}
                    className={`w-full rounded-xl border bg-gradient-to-br ${srv.color} ${srv.border} p-4 text-left transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${srv.glow} ${
                      selectedServer === srv.id ? "ring-2 ring-cyan-500/50 scale-[1.01]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{srv.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-rajdhani font-bold text-white text-lg">{srv.name}</span>
                          <span className="text-white/30 text-xs font-rubik">{srv.num}</span>
                        </div>
                        <div className="text-white/40 text-xs font-rubik mt-0.5">{srv.desc}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1.5 justify-end mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-green-400 text-xs font-rubik">онлайн</span>
                        </div>
                        <div className="font-rajdhani font-bold text-white text-lg">{srv.online}</div>
                        <div className="text-white/30 text-xs font-rubik">игроков</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 1: Login */}
          {step === "login" && (
            <>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{selectedServerData?.icon}</span>
                  <span className="text-white/40 text-sm font-rubik">{selectedServerData?.name} · {selectedServerData?.num}</span>
                </div>
                <h2 className="font-rajdhani font-bold text-xl text-white">Введите никнейм</h2>
                <p className="text-white/40 text-sm font-rubik mt-1">Ваш игровой позывной на сервере</p>
              </div>
              <input
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleNext()}
                placeholder="Player_Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-rajdhani text-lg tracking-wider focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20"
                autoFocus
              />
            </>
          )}

          {/* Step 2: Military ticket */}
          {step === "ticket" && (
            <>
              <div>
                <h2 className="font-rajdhani font-bold text-xl text-white">🎖️ Военный билет выдан!</h2>
                <p className="text-white/40 text-sm font-rubik mt-1">Сохраните данные вашего документа</p>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent p-4 space-y-2.5">
                <div className="flex justify-between border-b border-white/5 pb-2 mb-3">
                  <span className="font-rajdhani font-bold text-cyan-400 text-lg">ВОЕННЫЙ БИЛЕТ</span>
                  <span className="text-white/30 text-xs font-rubik self-end">RP MOBILE</span>
                </div>
                {[
                  { label: "Позывной", value: nickname },
                  { label: "Серия / Номер", value: ticketNumber },
                  { label: "Сервер", value: `${selectedServerData?.icon} ${selectedServerData?.name}` },
                  { label: "Статус", value: "Призывник" },
                  { label: "Дата", value: new Date().toLocaleDateString("ru-RU") },
                ].map(row => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-white/30 text-sm font-rubik">{row.label}</span>
                    <span className="text-white text-sm font-rajdhani font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs font-rubik text-center">Теперь выберите, куда устроиться на сервере</p>
            </>
          )}

          {/* Step 3: Choose fraction */}
          {step === "fraction" && (
            <>
              <div>
                <h2 className="font-rajdhani font-bold text-xl text-white">Выберите путь</h2>
                <p className="text-white/40 text-sm font-rubik mt-1">Куда хотите устроиться, {nickname}?</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {fractionChoices.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFraction(f.id)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 ${f.color} ${
                      selectedFraction === f.id ? "bg-white/10 scale-[1.02]" : "bg-white/3"
                    }`}
                  >
                    <div className="text-xl mb-1">{f.icon}</div>
                    <div className="font-rajdhani font-bold text-white text-sm">{f.label}</div>
                    <div className="text-white/35 text-xs font-rubik leading-tight mt-0.5">{f.desc}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3">
            {step !== "server" && (
              <button
                onClick={() => setStep(steps[stepIndex - 1])}
                className="px-4 py-3 rounded-xl border border-white/10 text-white/50 font-rubik text-sm hover:border-white/20 hover:text-white/80 transition-all"
              >
                ← Назад
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={btnDisabled}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-rajdhani font-bold text-lg tracking-wider hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed glow-cyan"
            >
              {btnLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
