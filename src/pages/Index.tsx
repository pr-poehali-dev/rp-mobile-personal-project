import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TeamsSection from "@/components/TeamsSection";
import StatsSection from "@/components/StatsSection";
import DonatesSection from "@/components/DonatesSection";
import SettingsSection from "@/components/SettingsSection";
import ProfileSection from "@/components/ProfileSection";
import LoginScreen from "@/components/LoginScreen";

export type Section = "teams" | "stats" | "donates" | "settings" | "profile";
export type AccessLevel = "owner" | "admin" | "moderator";

export interface AdminUser {
  name: string;
  role: AccessLevel;
  avatar: string;
  online: boolean;
  fraction?: string;
  server?: string;
}

export default function Index() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("stats");

  const handleLogin = (name: string, fraction: string, server: string) => {
    setUser({
      name,
      role: "moderator",
      avatar: name.slice(0, 2).toUpperCase(),
      online: true,
      fraction,
      server,
    });
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "teams": return <TeamsSection />;
      case "stats": return <StatsSection />;
      case "donates": return <DonatesSection />;
      case "settings": return <SettingsSection />;
      case "profile": return <ProfileSection user={user} />;
      default: return <StatsSection />;
    }
  };

  return (
    <div className="flex h-screen bg-background cyber-grid overflow-hidden relative">
      <div className="absolute top-0 left-64 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
      />

      <main className="flex-1 overflow-auto">
        <div key={activeSection} className="animate-fade-in-up p-6 h-full">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}