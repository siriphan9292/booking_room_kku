import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Screen, User, Room, Booking, ChatMessage, Notification, UserRole } from '@/types';
import {
  mockUser,
  mockAdmin,
  mockRooms,
  mockBookings,
  initialChatMessages,
  botResponses,
} from '@/data/mockData';

interface AppContextValue {
  screen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  isLoggedIn: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  currentUser: User | null;
  rooms: Room[];
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'userId' | 'userName' | 'userEmail'>) => void;
  cancelBooking: (id: string) => void;
  approveBooking: (id: string) => void;
  rejectBooking: (id: string, reason: string) => void;
  completeChecklist: (id: string) => void;
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
  selectedBookingForChecklist: Booking | null;
  setSelectedBookingForChecklist: (booking: Booking | null) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;
}

const AppContext = createContext<AppContextValue | null>(null);

const adminScreens: Screen[] = ['admin', 'checklist', 'notifications'];

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('login');
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedBookingForChecklist, setSelectedBookingForChecklist] = useState<Booking | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const navigate = (s: Screen) => {
    if (adminScreens.includes(s) && currentUser?.role !== 'admin') {
      setScreenHistory((prev) => [...prev, screen]);
      setScreen('accessDenied');
      return;
    }
    setScreenHistory((prev) => [...prev, screen]);
    setScreen(s);
  };

  const goBack = () => {
    setScreenHistory((prev) => {
      if (prev.length === 0) {
        setScreen(currentUser ? 'search' : 'login');
        return prev;
      }
      const newHistory = [...prev];
      const last = newHistory.pop()!;
      if (adminScreens.includes(last) && (!currentUser || currentUser.role !== 'admin')) {
        setScreen(currentUser?.role === 'admin' ? 'admin' : 'search');
      } else {
        setScreen(last);
      }
      return newHistory;
    });
  };

  const loginAs = (role: UserRole) => {
    setCurrentUser(role === 'admin' ? mockAdmin : mockUser);
    setScreenHistory([]);
    setScreen(role === 'admin' ? 'admin' : 'search');
  };

  const logout = () => {
    setCurrentUser(null);
    setScreenHistory([]);
    setScreen('login');
  };

  const addBooking: AppContextValue['addBooking'] = (data) => {
    if (!currentUser) return;
    const newBooking: Booking = {
      ...data,
      id: `b${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const cancelBooking = (id: string) => {
    const booking = bookings.find((b) => b.id === id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
    if (booking) {
      const notif: Notification = {
        id: `n${Date.now()}`,
        type: 'cancellation',
        bookingId: booking.id,
        roomName: booking.roomName,
        building: booking.building,
        requesterName: booking.userName,
        bookingDate: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        participants: booking.participants,
        purpose: booking.purpose,
        read: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const approveBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'approved' } : b))
    );
  };

  const rejectBooking = (id: string, reason: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'rejected', rejectionReason: reason } : b))
    );
    const booking = bookings.find((b) => b.id === id);
    if (booking) {
      const notif: Notification = {
        id: `n${Date.now()}`,
        type: 'rejection',
        bookingId: booking.id,
        roomName: booking.roomName,
        building: booking.building,
        requesterName: booking.userName,
        bookingDate: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        participants: booking.participants,
        purpose: booking.purpose,
        rejectionReason: reason,
        read: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const completeChecklist = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, checklistCompleted: true } : b))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `c${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    const response = botResponses[Math.floor(Math.random() * botResponses.length)];
    const botMsg: ChatMessage = {
      id: `c${Date.now() + 1}`,
      text: response,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    setTimeout(() => {
      setChatMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        navigate,
        goBack,
        isLoggedIn: !!currentUser,
        loginAs,
        logout,
        currentUser,
        rooms: mockRooms,
        bookings,
        addBooking,
        cancelBooking,
        approveBooking,
        rejectBooking,
        completeChecklist,
        selectedRoom,
        setSelectedRoom,
        selectedBookingForChecklist,
        setSelectedBookingForChecklist,
        chatMessages,
        sendChatMessage,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationCount: notifications.filter((n) => !n.read).length,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
