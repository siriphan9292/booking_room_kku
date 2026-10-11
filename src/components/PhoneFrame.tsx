import { useState } from 'react';
import { Bell, Building2, ChevronDown, ChevronLeft, ChevronRight, Grid2X2, LogOut, RefreshCw } from 'lucide-react';
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
  const { goBack, screen, currentUser, logout, navigate, unreadNotificationCount } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);

  if (showBack) {
    return (
      <div className="flex items-center gap-3 px-4 h-14 bg-white border-b border-gray-100 shrink-0 z-10">
        <button onClick={goBack} className="p-1 -ml-1 text-gray-700 hover:text-kku-red transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 truncate">
          {title ?? screenLabels[screen]}
        </h1>
      </div>
    );
  }

  return (
    <div className="relative bg-white border-b border-gray-100 shrink-0 z-20">
      <div className="h-[72px] px-4 flex items-center gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-kku-red flex items-center justify-center shadow-sm shadow-red-900/20">
            <Building2 size={23} className="text-white" />
          </div>
          <span className="text-[25px] leading-none font-black tracking-tight text-gray-900">kku<span className="text-kku-red">.</span></span>
        </div>
        <div className="h-9 w-px bg-gray-200" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-bold">พื้นที่ทำงาน</p>
          <p className="text-sm font-bold text-gray-800 truncate">ระบบจองห้องประชุม</p>
        </div>
        {currentUser && (
          <div className="relative">
            <button
              onClick={() => setProfileOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-full hover:bg-gray-50 p-1 transition-colors"
              aria-label="เปิดเมนูบัญชี"
            >
              <img src={currentUser.avatarUrl} alt="โปรไฟล์" className="w-9 h-9 rounded-full object-cover ring-2 ring-red-50" />
              <ChevronDown size={16} className={`text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-12 w-64 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-900/10 p-2 animate-scale-in">
                <div className="px-3 py-2.5">
                  <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => { logout(); setProfileOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-red-50 text-kku-red text-sm font-semibold hover:bg-red-100 transition-colors"
                >
                  <LogOut size={17} /> ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-11 px-4 flex items-center gap-2 bg-gray-50/80 border-t border-gray-100">
        <Grid2X2 size={17} className="text-gray-400" />
        <span className="text-sm text-gray-500">Workspace</span>
        <ChevronRight size={15} className="text-gray-300" />
        <span className="text-sm font-bold text-gray-800 truncate">{title ?? screenLabels[screen]}</span>
        <div className="ml-auto flex items-center gap-1">
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-kku-red hover:bg-white transition-colors" aria-label="รีเฟรช">
            <RefreshCw size={18} />
          </button>
          {currentUser?.role === 'admin' && (
            <button onClick={() => navigate('notifications')} className="relative p-1.5 rounded-lg text-gray-400 hover:text-kku-red hover:bg-white transition-colors" aria-label="การแจ้งเตือน">
              <Bell size={19} />
              {unreadNotificationCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] px-0.5 bg-kku-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}</span>}
            </button>
          )}
        </div>
      </div>
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
