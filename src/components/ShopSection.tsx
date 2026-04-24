import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ShopItem {
  id: string;
  name: string;
  type: "car" | "skin" | "video";
  price: number;
  icon: string;
  desc: string;
  tag?: string;
  tagColor?: string;
  owned?: boolean;
}

const SHOP_ITEMS: ShopItem[] = [
  // Машины
  { id: "supercar_dubai", name: "Dubai Supercar", type: "car", price: 4500, icon: "🏎️", desc: "Эксклюзивный суперкар из Дубая. Макс. скорость 320 км/ч", tag: "Дубай", tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { id: "limousine", name: "Presidential Limo", type: "car", price: 6000, icon: "🚗", desc: "Президентский лимузин. Только для правительства.", tag: "Правительство", tagColor: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
  { id: "military_truck", name: "Военный КамАЗ", type: "car", price: 2800, icon: "🚚", desc: "Бронированный грузовик Военной части.", tag: "Военные", tagColor: "text-slate-400 border-slate-500/30 bg-slate-500/10" },
  { id: "bmw_almaty", name: "BMW Almaty Edition", type: "car", price: 3200, icon: "🚙", desc: "Коллекционный BMW с горными номерами Алматы.", tag: "Алматы", tagColor: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
  { id: "opg_van", name: "ОПГ Микроавтобус", type: "car", price: 1900, icon: "🚐", desc: "Тонированный микроавтобус группировки.", tag: "ОПГ", tagColor: "text-red-400 border-red-500/30 bg-red-500/10" },
  // Скины
  { id: "pasha_tech", name: "Паша Техник", type: "skin", price: 2500, icon: "👤", desc: "Легендарный скин — Паша Техник. Узнаваем на весь сервер.", tag: "Легенда", tagColor: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  { id: "military_skin", name: "Военная форма №7", type: "skin", price: 1200, icon: "🪖", desc: "Парадная форма офицера Военной части.", tag: "Военные", tagColor: "text-slate-400 border-slate-500/30 bg-slate-500/10" },
  { id: "boss_skin", name: "Босс ОПГ", type: "skin", price: 1800, icon: "🕴️", desc: "Кожаный плащ и кепка. Авторитет с первого взгляда.", tag: "ОПГ", tagColor: "text-red-400 border-red-500/30 bg-red-500/10" },
  { id: "sheikh_skin", name: "Шейх Дубая", type: "skin", price: 3000, icon: "🧕", desc: "Белая дишдаша. Роскошь и власть.", tag: "Дубай", tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  // Видео/ролики
  { id: "video_intro", name: "Интро-ролик сервера", type: "video", price: 0, icon: "🎬", desc: "Официальное интро RP MOBILE. Смотри перед каждым входом.", tag: "Бесплатно", tagColor: "text-green-400 border-green-500/30 bg-green-500/10", owned: true },
  { id: "video_tutorial", name: "Гайд: Как работает RP", type: "video", price: 0, icon: "📹", desc: "Обучающий ролик для новичков. Фракции, работа, правила.", tag: "Бесплатно", tagColor: "text-green-400 border-green-500/30 bg-green-500/10", owned: true },
  { id: "video_trucker", name: "Гайд: Дальнобойщик", type: "video", price: 500, icon: "🎥", desc: "Как быстро пройти 8 рейсов и получить 800₽ доната.", tag: "Гайд", tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
];

const FILTERS = [
  { id: "all", label: "Всё" },
  { id: "car", label: "🏎️ Машины" },
  { id: "skin", label: "👤 Скины" },
  { id: "video", label: "🎬 Ролики" },
];

interface ShopSectionProps {
  balance: number;
  onBuy: (price: number, name: string) => void;
}

export default function ShopSection({ balance, onBuy }: ShopSectionProps) {
  const [filter, setFilter] = useState("all");
  const [bought, setBought] = useState<Set<string>>(new Set(["video_intro", "video_tutorial"]));
  const [toast, setToast] = useState<string | null>(null);

  const filtered = filter === "all" ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.type === filter);

  const handleBuy = (item: ShopItem) => {
    if (bought.has(item.id)) return;
    if (balance < item.price) {
      setToast("Недостаточно средств!");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    setBought(prev => new Set(prev).add(item.id));
    onBuy(item.price, item.name);
    setToast(`Куплено: ${item.name}!`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in-up bg-green-500/20 border border-green-500/40 text-green-400 font-rubik text-sm px-4 py-3 rounded-xl backdrop-blur">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-rajdhani font-bold text-2xl text-white tracking-wide">Донат-магазин</h2>
          <p className="text-white/40 text-sm font-rubik mt-1">Машины, скины, гайды и ролики</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
          <Icon name="DollarSign" fallback="Circle" size={14} className="text-green-400" />
          <span className="font-rajdhani font-bold text-green-400">₽{balance.toLocaleString("ru-RU")}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-rubik border transition-all duration-200 ${
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
        {filtered.map(item => {
          const isOwned = bought.has(item.id);
          return (
            <div
              key={item.id}
              className={`rounded-xl border p-5 animate-fade-in-up transition-all duration-200 hover:scale-[1.01] ${
                isOwned
                  ? "border-green-500/20 bg-green-500/5"
                  : "border-white/8 bg-card hover:border-white/15"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{item.icon}</span>
                {item.tag && (
                  <span className={`text-xs font-rubik px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                )}
              </div>
              <h3 className="font-rajdhani font-bold text-white text-base">{item.name}</h3>
              <p className="text-white/40 text-xs font-rubik mt-1 mb-4 leading-relaxed">{item.desc}</p>
              <div className="flex items-center justify-between">
                <div className="font-rajdhani font-bold text-xl text-white">
                  {item.price === 0 ? <span className="text-green-400">Бесплатно</span> : `₽${item.price.toLocaleString()}`}
                </div>
                <button
                  onClick={() => handleBuy(item)}
                  disabled={isOwned}
                  className={`px-4 py-1.5 rounded-lg text-sm font-rubik font-medium transition-all ${
                    isOwned
                      ? "bg-green-500/10 text-green-400 border border-green-500/20 cursor-default"
                      : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30"
                  }`}
                >
                  {isOwned ? "✓ Есть" : item.price === 0 ? "Смотреть" : "Купить"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
