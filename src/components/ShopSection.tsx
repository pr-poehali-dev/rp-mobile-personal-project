import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ShopItem {
  id: string;
  name: string;
  type: "car" | "skin" | "video" | "tuning" | "avia";
  price: number;
  currency: "rub" | "lam";
  icon: string;
  desc: string;
  tag?: string;
  tagColor?: string;
  owned?: boolean;
  rare?: boolean;
}

const SHOP_ITEMS: ShopItem[] = [
  // Машины — рубли
  { id: "supercar_dubai", name: "Dubai Supercar", type: "car", price: 4500, currency: "rub", icon: "🏎️", desc: "Эксклюзивный суперкар из Дубая. Макс. скорость 320 км/ч", tag: "Дубай", tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { id: "limousine", name: "Presidential Limo", type: "car", price: 6000, currency: "rub", icon: "🚗", desc: "Президентский лимузин. Только для правительства.", tag: "Правительство", tagColor: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
  { id: "military_truck", name: "Военный КамАЗ", type: "car", price: 2800, currency: "rub", icon: "🚚", desc: "Бронированный грузовик Военной части.", tag: "Военные", tagColor: "text-slate-400 border-slate-500/30 bg-slate-500/10" },
  { id: "opg_van", name: "ОПГ Микроавтобус", type: "car", price: 1900, currency: "rub", icon: "🚐", desc: "Тонированный микроавтобус группировки.", tag: "ОПГ", tagColor: "text-red-400 border-red-500/30 bg-red-500/10" },
  // Машины — ламы (ПРЕМИУМ)
  { id: "lambo_old", name: "Lamborghini Старый", type: "car", price: 10000, currency: "lam", icon: "🐂", desc: "Легендарный старый Lamborghini. Только для избранных. 10 000 лам.", tag: "Легенда", tagColor: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10", rare: true },
  { id: "bmw_m5", name: "BMW M5", type: "car", price: 20, currency: "lam", icon: "🚘", desc: "BMW M5 — король дорог. 20 лам.", tag: "Горячий", tagColor: "text-blue-400 border-blue-500/30 bg-blue-500/10", rare: true },
  { id: "bmw_almaty", name: "BMW Almaty Edition", type: "car", price: 3200, currency: "rub", icon: "🚙", desc: "Коллекционный BMW с горными номерами Алматы.", tag: "Алматы", tagColor: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
  // Тюнинг — ламы
  { id: "tuning_body", name: "Обвес Sport Body Kit", type: "tuning", price: 100, currency: "lam", icon: "🔧", desc: "Аэродинамический обвес. +15% к максимальной скорости.", tag: "Тюнинг", tagColor: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  { id: "tuning_engine", name: "Тюнинг двигателя V8", type: "tuning", price: 100, currency: "lam", icon: "⚙️", desc: "Форсированный V8. Разгон до 100 за 3.2 сек.", tag: "Тюнинг", tagColor: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  { id: "tuning_wheels", name: "Диски Forgiato 22\"", type: "tuning", price: 100, currency: "lam", icon: "🔩", desc: "Фирменные диски. Стиль на всех серверах.", tag: "Тюнинг", tagColor: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  { id: "tuning_nitro", name: "Закись Азота (NOS)", type: "tuning", price: 100, currency: "lam", icon: "💨", desc: "Кнопка NOS. +60% скорость на 10 секунд.", tag: "Тюнинг", tagColor: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  { id: "tuning_paint", name: "Покраска Candy Chrome", type: "tuning", price: 100, currency: "lam", icon: "🎨", desc: "Хромированный Candy. Видно издалека.", tag: "Тюнинг", tagColor: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  // Авиасалоны — ламы
  { id: "avia_boeing", name: "Авиасалон Boeing", type: "avia", price: 500, currency: "lam", icon: "✈️", desc: "Частный Boeing 737. Перелёты между серверами — Дубай, Алматы, Тольятти.", tag: "Авиа", tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10", rare: true },
  { id: "avia_private", name: "Частный Джет G700", type: "avia", price: 1500, currency: "lam", icon: "🛩️", desc: "Gulfstream G700. VIP-кабина, бар на борту. Только для боссов.", tag: "VIP Авиа", tagColor: "text-purple-400 border-purple-500/30 bg-purple-500/10", rare: true },
  { id: "avia_helicopter", name: "Вертолёт Bell 407", type: "avia", price: 300, currency: "lam", icon: "🚁", desc: "Полицейский вертолёт. Патруль всех трёх серверов.", tag: "Авиа", tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
  { id: "avia_cargo", name: "Грузовой Ил-76", type: "avia", price: 800, currency: "lam", icon: "🛫", desc: "Советский военный транспортник. Доставка грузов и войск.", tag: "Военные", tagColor: "text-slate-400 border-slate-500/30 bg-slate-500/10" },
  // Скины
  { id: "pasha_tech", name: "Паша Техник", type: "skin", price: 2500, currency: "rub", icon: "👤", desc: "Легендарный скин — Паша Техник. Узнаваем на весь сервер.", tag: "Легенда", tagColor: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  { id: "military_skin", name: "Военная форма №7", type: "skin", price: 1200, currency: "rub", icon: "🪖", desc: "Парадная форма офицера Военной части.", tag: "Военные", tagColor: "text-slate-400 border-slate-500/30 bg-slate-500/10" },
  { id: "boss_skin", name: "Босс ОПГ", type: "skin", price: 1800, currency: "rub", icon: "🕴️", desc: "Кожаный плащ и кепка. Авторитет с первого взгляда.", tag: "ОПГ", tagColor: "text-red-400 border-red-500/30 bg-red-500/10" },
  { id: "sheikh_skin", name: "Шейх Дубая", type: "skin", price: 3000, currency: "rub", icon: "🧕", desc: "Белая дишдаша. Роскошь и власть.", tag: "Дубай", tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  // Видео
  { id: "video_intro", name: "Интро-ролик сервера", type: "video", price: 0, currency: "rub", icon: "🎬", desc: "Официальное интро RP MOBILE. Смотри перед каждым входом.", tag: "Бесплатно", tagColor: "text-green-400 border-green-500/30 bg-green-500/10", owned: true },
  { id: "video_tutorial", name: "Гайд: Как работает RP", type: "video", price: 0, currency: "rub", icon: "📹", desc: "Обучающий ролик для новичков. Фракции, работа, правила.", tag: "Бесплатно", tagColor: "text-green-400 border-green-500/30 bg-green-500/10", owned: true },
  { id: "video_trucker", name: "Гайд: Дальнобойщик", type: "video", price: 500, currency: "rub", icon: "🎥", desc: "Как быстро пройти 8 рейсов и получить 800₽ доната.", tag: "Гайд", tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
];

const FILTERS = [
  { id: "all",    label: "Всё" },
  { id: "car",    label: "🏎️ Машины" },
  { id: "tuning", label: "🔧 Тюнинг" },
  { id: "avia",   label: "✈️ Авиасалон" },
  { id: "skin",   label: "👤 Скины" },
  { id: "video",  label: "🎬 Ролики" },
];

interface ShopSectionProps {
  balance: number;
  lams: number;
  onBuyRub: (price: number) => void;
  onBuyLam: (price: number) => void;
}

export default function ShopSection({ balance, lams, onBuyRub, onBuyLam }: ShopSectionProps) {
  const [filter, setFilter] = useState("all");
  const [bought, setBought] = useState<Set<string>>(new Set(["video_intro", "video_tutorial"]));
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);

  const filtered = filter === "all" ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.type === filter);

  const showToast = (text: string, ok: boolean) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 2500);
  };

  const handleBuy = (item: ShopItem) => {
    if (bought.has(item.id)) return;
    if (item.currency === "rub") {
      if (balance < item.price) { showToast("Недостаточно рублей!", false); return; }
      onBuyRub(item.price);
    } else {
      if (lams < item.price) { showToast("Недостаточно лам! Заработай больше.", false); return; }
      onBuyLam(item.price);
    }
    setBought(prev => new Set(prev).add(item.id));
    showToast(`Куплено: ${item.name}!`, true);
  };

  const formatPrice = (item: ShopItem) => {
    if (item.price === 0) return null;
    if (item.currency === "lam") return `🐑 ${item.price.toLocaleString()} лам`;
    return `₽${item.price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 animate-fade-in-up border font-rubik text-sm px-4 py-3 rounded-xl backdrop-blur ${
          toast.ok
            ? "bg-green-500/20 border-green-500/40 text-green-400"
            : "bg-red-500/20 border-red-500/40 text-red-400"
        }`}>
          {toast.text}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-rajdhani font-bold text-2xl text-white tracking-wide">Донат-магазин</h2>
          <p className="text-white/40 text-sm font-rubik mt-1">Машины, тюнинг, авиасалон, скины, ролики</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
            <Icon name="DollarSign" fallback="Circle" size={13} className="text-green-400" />
            <div>
              <div className="text-white/30 text-xs font-rubik leading-none">Рубли</div>
              <span className="font-rajdhani font-bold text-green-400 text-sm">₽{balance.toLocaleString("ru-RU")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
            <span className="text-base">🐑</span>
            <div>
              <div className="text-white/30 text-xs font-rubik leading-none">Ламы</div>
              <span className="font-rajdhani font-bold text-yellow-400 text-sm">{lams.toLocaleString()}</span>
            </div>
          </div>
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

      {/* Lam info banner */}
      {(filter === "all" || filter === "car" || filter === "tuning" || filter === "avia") && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 flex items-center gap-3">
          <span className="text-xl">🐑</span>
          <div>
            <div className="font-rajdhani font-bold text-yellow-400 text-sm">Ламы — игровая валюта</div>
            <div className="text-white/35 text-xs font-rubik">Зарабатывай на работах, достижениях и активности на сервере</div>
          </div>
          <div className="ml-auto text-right shrink-0">
            <div className="font-rajdhani font-bold text-yellow-400">{lams.toLocaleString()}</div>
            <div className="text-white/30 text-xs font-rubik">твой баланс</div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(item => {
          const isOwned = bought.has(item.id);
          const priceLabel = formatPrice(item);
          const isLam = item.currency === "lam";
          return (
            <div
              key={item.id}
              className={`rounded-xl border p-5 transition-all duration-200 hover:scale-[1.01] relative ${
                item.rare ? "border-yellow-500/25 bg-gradient-to-br from-yellow-500/5 to-transparent" :
                isOwned ? "border-green-500/20 bg-green-500/5" : "border-white/8 bg-card hover:border-white/15"
              }`}
            >
              {item.rare && (
                <div className="absolute top-2 right-2">
                  <div className="text-xs font-rubik text-yellow-400 bg-yellow-500/15 border border-yellow-500/25 px-1.5 py-0.5 rounded-full">⭐ Редкий</div>
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{item.icon}</span>
                {item.tag && !item.rare && (
                  <span className={`text-xs font-rubik px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                )}
              </div>
              <h3 className="font-rajdhani font-bold text-white text-base">{item.name}</h3>
              <p className="text-white/40 text-xs font-rubik mt-1 mb-4 leading-relaxed">{item.desc}</p>
              <div className="flex items-center justify-between">
                <div className={`font-rajdhani font-bold text-lg ${isLam ? "text-yellow-400" : "text-white"}`}>
                  {item.price === 0
                    ? <span className="text-green-400">Бесплатно</span>
                    : priceLabel
                  }
                </div>
                <button
                  onClick={() => handleBuy(item)}
                  disabled={isOwned}
                  className={`px-4 py-1.5 rounded-lg text-sm font-rubik font-medium transition-all ${
                    isOwned
                      ? "bg-green-500/10 text-green-400 border border-green-500/20 cursor-default"
                      : isLam
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30"
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
