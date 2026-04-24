import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TeamsSection from "@/components/TeamsSection";
import StatsSection from "@/components/StatsSection";
import DonatesSection from "@/components/DonatesSection";
import SettingsSection from "@/components/SettingsSection";
import ProfileSection from "@/components/ProfileSection";
import ShopSection from "@/components/ShopSection";
import PromoSection from "@/components/PromoSection";
import LoginScreen from "@/components/LoginScreen";
import GameBar from "@/components/GameBar";

export type Section = "teams" | "stats" | "donates" | "shop" | "promo" | "settings" | "profile";
export type AccessLevel = "owner" | "admin" | "moderator";

export interface AdminUser {
  name: string;
  role: AccessLevel;
  avatar: string;
  online: boolean;
  fraction?: string;
  server?: string;
}

const STORAGE_KEY = "rpmobile_player";

interface PlayerState {
  balance: number;
  level: number;
  xp: number;
  hoursPlayed: number;
}

function loadState(name: string): PlayerState {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${name}`);
    if (raw) return JSON.parse(raw) as PlayerState;
  } catch (e) {
    console.warn("Load state error", e);
  }
  return { balance: 200_000_000_000, level: 1, xp: 0, hoursPlayed: 347 };
}

function saveState(name: string, state: PlayerState) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${name}`, JSON.stringify(state));
  } catch (e) {
    console.warn("Save state error", e);
  }
}

export default function Index() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("stats");
  const [playerState, setPlayerState] = useState<PlayerState>({
    balance: 200_000_000_000,
    level: 1,
    xp: 0,
    hoursPlayed: 347,
  });

  // Auto-save every 30s + on change
  useEffect(() => {
    if (!user) return;
    saveState(user.name, playerState);
  }, [playerState, user]);

  // Tick hours played every 60 real seconds
  useEffect(() => {
    if (!user) return;
    const t = setInterval(() => {
      setPlayerState(prev => {
        const next = { ...prev, hoursPlayed: prev.hoursPlayed + 1 };
        saveState(user.name, next);
        return next;
      });
    }, 60_000);
    return () => clearInterval(t);
  }, [user]);

  const handleLogin = (name: string, fraction: string, server: string) => {
    const loaded = loadState(name);
    setPlayerState(loaded);
    setUser({
      name,
      role: name.toLowerCase() === "owner" || name.toLowerCase().includes("vlad") ? "owner" : "moderator",
      avatar: name.slice(0, 2).toUpperCase(),
      online: true,
      fraction,
      server,
    });
  };

  const addBalance = (amount: number) => {
    setPlayerState(prev => ({ ...prev, balance: prev.balance + amount }));
  };

  const spendBalance = (amount: number) => {
    setPlayerState(prev => ({ ...prev, balance: Math.max(0, prev.balance - amount) }));
  };

  const addXp = (amount: number) => {
    setPlayerState(prev => {
      const newXp = prev.xp + amount;
      const xpPerLevel = 1000;
      if (newXp >= xpPerLevel) {
        return { ...prev, xp: newXp - xpPerLevel, level: prev.level + 1 };
      }
      return { ...prev, xp: newXp };
    });
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "teams":    return <TeamsSection />;
      case "stats":    return <StatsSection />;
      case "donates":  return <DonatesSection />;
      case "shop":     return <ShopSection balance={playerState.balance} onBuy={(price, _name) => { spendBalance(price); addXp(50); }} />;
      case "promo":    return <PromoSection balance={playerState.balance} onPromo={(amt, _code) => addBalance(amt)} />;
      case "settings": return <SettingsSection />;
      case "profile":  return <ProfileSection user={user} balance={playerState.balance} level={playerState.level} xp={playerState.xp} hoursPlayed={playerState.hoursPlayed} />;
      default:         return <StatsSection />;
    }
  };

  return (
    <div className="flex bg-background cyber-grid overflow-hidden relative" style={{ height: "calc(100vh - 56px)" }}>
      <div className="absolute top-0 left-64 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        balance={playerState.balance}
      />

      <main className="flex-1 overflow-auto">
        <div key={activeSection} className="animate-fade-in-up p-6 h-full">
          {renderSection()}
        </div>
      </main>

      <GameBar
        balance={playerState.balance}
        onAchievementClaim={(reward) => addBalance(reward)}
      />
    </div>
  );
}