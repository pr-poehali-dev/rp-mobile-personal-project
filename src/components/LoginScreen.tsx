import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginScreenProps {
  onLogin: (name: string, role: string) => void;
}

const fractionChoices = [
  { id: "military", label: "Военная часть", icon: "⚔️", desc: "Служить Родине. Дисциплина и честь.", color: "border-slate-500/40 hover:border-slate-400/60" },
  { id: "opg", label: "ОПГ", icon: "🔫", desc: "Своя игра. Власть через силу.", color: "border-red-500/40 hover:border-red-400/60" },
  { id: "government", label: "Правительство", icon: "🏛️", desc: "Управлять городом. Законы и власть.", color: "border-yellow-500/40 hover:border-yellow-400/60" },
  { id: "civil", label: "Гражданский", icon: "🏙️", desc: "Свободный путь. Бизнес и жизнь.", color: "border-blue-500/40 hover:border-blue-400/60" },
];

type Step = "login" | "ticket" | "fraction";

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<Step>("login");
  const [nickname, setNickname] = useState("");
  const [selectedFraction, setSelectedFraction] = useState("");
  const [ticketNumber] = useState(() => `РП-2024-${String(Math.floor(Math.random() * 90000) + 10000)}`);

  const handleNext = () => {
    if (step === "login" && nickname.trim()) setStep("ticket");
    else if (step === "ticket") setStep("fraction");
    else if (step === "fraction" && selectedFraction) onLogin(nickname, selectedFraction);
  };

  return (
    <div className="fixed inset-0 bg-background cyber-grid flex items-center justify-center">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md px-4 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center glow-cyan animate-float">
              <span className="font-rajdhani font-bold text-black text-lg">RP</span>
            </div>
            <h1 className="font-rajdhani font-bold text-4xl text-white tracking-widest text-glow-cyan">MOBILE</h1>
          </div>
          <p className="text-white/30 text-sm font-rubik">Военно-ролевой сервер</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {(["login", "ticket", "fraction"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === s ? "bg-cyan-400 w-6" : (["login", "ticket", "fraction"].indexOf(step) > i ? "bg-cyan-600" : "bg-white/15")}`} />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/8 bg-card/80 backdrop-blur-xl p-6 space-y-5">
          {/* Step 1: Login */}
          {step === "login" && (
            <>
              <div>
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
                      selectedFraction === f.id
                        ? "bg-white/10 scale-[1.02]"
                        : "bg-white/3"
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

          <button
            onClick={handleNext}
            disabled={(step === "login" && !nickname.trim()) || (step === "fraction" && !selectedFraction)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-rajdhani font-bold text-lg tracking-wider hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed glow-cyan"
          >
            {step === "login" ? "Войти на сервер" : step === "ticket" ? "Забрать билет" : "Начать игру →"}
          </button>
        </div>
      </div>
    </div>
  );
}
