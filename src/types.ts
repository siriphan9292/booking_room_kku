export type Screen =
  | 'login'
  | 'search'
  | 'booking'
  | 'chatbot'
  | 'history'
  | 'admin'
  | 'checklist'
  | 'notifications'
  | 'accessDenied';

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  amenities: string[];
  imageUrl: string;
  openTime: string;
  closeTime: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  building: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  participants: number;
  status: BookingStatus;
  rejectionReason?: string;
  checklistCompleted?: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export type NotificationType = 'rejection' | 'cancellation';

export interface Notification {
  id: string;
  type: NotificationType;
  bookingId: string;
  roomName: string;
  building: string;
  requesterName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  participants: number;
  purpose: string;
  rejectionReason?: string;
  read: boolean;
  createdAt: string;
}
