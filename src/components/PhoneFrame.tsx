import { ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Screen } from '@/types';

const screenLabels: Record<Screen, string> = {
  login: 'เข้าสู่ระบบ',
  search: 'ค้นหาห้องว่าง',
  booking: 'จองห้องประชุม',
  chatbot: 'ผู้ช่วย',
  history: 'ประวัติการจอง',
  admin: 'อนุมัติการจอง',
  checklist: 'ตรวจสภาพห้อง',
  notifications: 'การแจ้งเตือน',
  accessDenied: 'การเข้าถึงถูกปฏิเสธ',
};

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-[#0d3530] flex items-center justify-center p-0 sm:p-6 md:p-10">
      <div className="relative w-full sm:w-[400px] h-screen sm:h-[820px] sm:rounded-[2.5rem] bg-white sm:shadow-2xl sm:border-[10px] sm:border-[#0d3530] overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}

export function AppHeader({ title, showBack = true }: { title?: string; showBack?: boolean }) {
  const { goBack, screen } = useApp();
  return (
    <div className="flex items-center gap-3 px-4 h-14 bg-white border-b border-gray-100 shrink-0 z-10">
      {showBack && (
        <button onClick={goBack} className="p-1 -ml-1 text-gray-700 hover:text-kku-red transition-colors">
          <ChevronLeft size={24} />
        </button>
      )}
      <h1 className="text-lg font-bold text-gray-900 flex-1 truncate">
        {title ?? screenLabels[screen]}
      </h1>
    </div>
  );
}

const userNavItems = [
  { screen: 'search' as const, label: 'ค้นหา', icon: 'search' },
  { screen: 'history' as const, label: 'ประวัติ', icon: 'history' },
  { screen: 'chatbot' as const, label: 'แชท', icon: 'chat' },
];

const adminNavItems = [
  { screen: 'admin' as const, label: 'อนุมัติ', icon: 'admin' },
  { screen: 'search' as const, label: 'ค้นหา', icon: 'search' },
  { screen: 'chatbot' as const, label: 'แชท', icon: 'chat' },
];

import { Search, History, MessageCircle, ShieldCheck } from 'lucide-react';

export function BottomNav() {
  const { screen, navigate, currentUser } = useApp();
  if (screen === 'login' || screen === 'booking' || screen === 'checklist' || screen === 'notifications' || screen === 'accessDenied') return null;

  const isAdmin = currentUser?.role === 'admin';
  const items = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="h-16 bg-white border-t border-gray-100 flex items-center justify-around shrink-0 pb-1">
      {items.map((item) => {
        const Icon = item.icon === 'search' ? Search : item.icon === 'history' ? History : item.icon === 'chat' ? MessageCircle : ShieldCheck;
        const active = screen === item.screen;
        return (
          <button
            key={item.screen}
            onClick={() => navigate(item.screen)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${active ? 'text-kku-red' : 'text-gray-400'}`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            <span className={`text-[11px] font-semibold ${active ? 'text-kku-red' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
