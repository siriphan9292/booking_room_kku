import { AppProvider, useApp } from '@/context/AppContext';
import { PhoneFrame, BottomNav } from '@/components/PhoneFrame';
import { Button } from '@/components/ui';
import { LoginScreen } from '@/screens/LoginScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { BookingScreen } from '@/screens/BookingScreen';
import { ChatbotScreen } from '@/screens/ChatbotScreen';
import { HistoryScreen } from '@/screens/HistoryScreen';
import { AdminScreen } from '@/screens/AdminScreen';
import { ChecklistScreen } from '@/screens/ChecklistScreen';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { ShieldAlert } from 'lucide-react';
import type { Screen } from '@/types';

function AccessDeniedScreen() {
  const { navigate, currentUser } = useApp();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-5">
          <ShieldAlert size={44} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">การเข้าถึงถูกปฏิเสธ</h2>
        <p className="text-sm text-gray-500 mb-1">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้
        </p>
        <p className="text-sm text-gray-500 mb-8">
          หน้านี้สงวนไว้สำหรับผู้ดูแลระบบเท่านั้น
        </p>
        <Button
          onClick={() => navigate(currentUser?.role === 'admin' ? 'admin' : 'search')}
          size="lg"
          className="w-full"
        >
          กลับหน้าหลัก
        </Button>
      </div>
    </div>
  );
}

function ScreenRouter() {
  const { screen, isLoggedIn, currentUser } = useApp();

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const isAdmin = currentUser?.role === 'admin';

  const adminScreens: Screen[] = ['admin', 'checklist', 'notifications'];

  const screens: Record<Screen, React.ReactNode> = {
    login: <LoginScreen />,
    search: <SearchScreen />,
    booking: <BookingScreen />,
    chatbot: <ChatbotScreen />,
    history: isAdmin ? <SearchScreen /> : <HistoryScreen />,
    admin: isAdmin ? <AdminScreen /> : <AccessDeniedScreen />,
    checklist: isAdmin ? <ChecklistScreen /> : <AccessDeniedScreen />,
    notifications: isAdmin ? <NotificationsScreen /> : <AccessDeniedScreen />,
    accessDenied: <AccessDeniedScreen />,
  };

  const effectiveScreen: Screen = adminScreens.includes(screen) && !isAdmin ? 'accessDenied' : screen;

  return (
    <div key={effectiveScreen} className="flex flex-col h-full animate-fade-in">
      <div className="flex-1 overflow-hidden flex flex-col">{screens[effectiveScreen]}</div>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <PhoneFrame>
        <ScreenRouter />
      </PhoneFrame>
    </AppProvider>
  );
}

export default App;
