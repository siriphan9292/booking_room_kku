import type { Room, Booking, User, ChatMessage } from '@/types';

export const mockUser: User = {
  id: 'u1',
  name: 'สมชาย ใจดี',
  email: 'somchai.j@kku.ac.th',
  avatarUrl:
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&fit=crop&crop=face',
  role: 'user',
};

export const mockAdmin: User = {
  id: 'a1',
  name: 'ผศ. ดร. อนุชา',
  email: 'anucha.k@kku.ac.th',
  avatarUrl:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face',
  role: 'admin',
};

export const mockRooms: Room[] = [
  {
    id: 'r1',
    name: 'ห้องประชุมสยาม 1',
    building: 'อาคารสยามทอง',
    floor: 'ชั้น 2',
    capacity: 20,
    amenities: ['โปรเจคเตอร์', 'ไวท์บอร์ด', 'แอร์', 'เครื่องเสียง'],
    imageUrl:
      'https://images.pexels.com/photos/31107325/pexels-photo-31107325.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    openTime: '08:00',
    closeTime: '17:00',
  },
  {
    id: 'r2',
    name: 'ห้องประชุมศรีณวงก์',
    building: 'อาคารเรียนรวม 1',
    floor: 'ชั้น 3',
    capacity: 40,
    amenities: ['โปรเจคเตอร์', 'ไมโครโฟน', 'แอร์', 'เครื่องเสียง', 'เวที'],
    imageUrl:
      'https://images.pexels.com/photos/9300726/pexels-photo-9300726.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    openTime: '08:30',
    closeTime: '16:30',
  },
  {
    id: 'r3',
    name: 'ห้องสัมมนามอญ',
    building: 'อาคารบัณฑิตย์',
    floor: 'ชั้น 1',
    capacity: 15,
    amenities: ['ทีวี 55 นิ้ว', 'ไวท์บอร์ด', 'แอร์'],
    imageUrl:
      'https://images.pexels.com/photos/7511754/pexels-photo-7511754.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    openTime: '08:00',
    closeTime: '18:00',
  },
  {
    id: 'r4',
    name: 'ห้องประชุมขอนแก่น',
    building: 'อาคารสยามทอง',
    floor: 'ชั้น 5',
    capacity: 60,
    amenities: ['โปรเจคเตอร์', 'ไมโครโฟน', 'แอร์', 'เครื่องเสียง', 'เวที', 'ระบบแปลภาษา'],
    imageUrl:
      'https://images.pexels.com/photos/5506053/pexels-photo-5506053.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    openTime: '08:00',
    closeTime: '17:00',
  },
  {
    id: 'r5',
    name: 'ห้องประชุมอีสาน',
    building: 'อาคารเรียนรวม 2',
    floor: 'ชั้น 2',
    capacity: 10,
    amenities: ['ทีวี 55 นิ้ว', 'แอร์'],
    imageUrl:
      'https://images.pexels.com/photos/13323673/pexels-photo-13323673.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    openTime: '09:00',
    closeTime: '16:00',
  },
  {
    id: 'r6',
    name: 'ห้องประชุมเฉลิมพระเกียรติ',
    building: 'อาคารสิริธร',
    floor: 'ชั้น 4',
    capacity: 30,
    amenities: ['โปรเจคเตอร์', 'ไวท์บอร์ด', 'แอร์', 'เครื่องเสียง', 'ไมโครโฟน'],
    imageUrl:
      'https://images.pexels.com/photos/16859956/pexels-photo-16859956.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    openTime: '08:00',
    closeTime: '17:00',
  },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(dayAfter.getDate() + 2);

const fmt = (d: Date) => d.toISOString().split('T')[0];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    roomId: 'r1',
    roomName: 'ห้องประชุมสยาม 1',
    building: 'อาคารสยามทอง',
    userId: 'u1',
    userName: 'สมชาย ใจดี',
    userEmail: 'somchai.j@kku.ac.th',
    date: fmt(today),
    startTime: '09:00',
    endTime: '11:00',
    purpose: 'ประชุมภาควิชา นำเสนอแผนงานไตรมาส 4',
    participants: 18,
    status: 'approved',
    checklistCompleted: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'b2',
    roomId: 'r2',
    roomName: 'ห้องประชุมศรีณวงก์',
    building: 'อาคารเรียนรวม 1',
    userId: 'u1',
    userName: 'สมชาย ใจดี',
    userEmail: 'somchai.j@kku.ac.th',
    date: fmt(tomorrow),
    startTime: '13:00',
    endTime: '15:00',
    purpose: 'สัมมนาวิจัย หัวข้อ AI ในการศึกษา',
    participants: 35,
    status: 'pending',
    checklistCompleted: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'b3',
    roomId: 'r5',
    roomName: 'ห้องประชุมอีสาน',
    building: 'อาคารเรียนรวม 2',
    userId: 'u1',
    userName: 'สมชาย ใจดี',
    userEmail: 'somchai.j@kku.ac.th',
    date: fmt(dayAfter),
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'ประชุมทีมพัฒนาแอปพลิเคชัน',
    participants: 8,
    status: 'pending',
    checklistCompleted: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'b4',
    roomId: 'r3',
    roomName: 'ห้องสัมมนามอญ',
    building: 'อาคารบัณฑิตย์',
    userId: 'u2',
    userName: 'สมหญิง รักไทย',
    userEmail: 'somying.r@kku.ac.th',
    date: fmt(today),
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'สัมมนานักศึกษา ชั้นปีที่ 3',
    participants: 12,
    status: 'pending',
    checklistCompleted: false,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'b5',
    roomId: 'r4',
    roomName: 'ห้องประชุมขอนแก่น',
    building: 'อาคารสยามทอง',
    userId: 'u2',
    userName: 'สมหญิง รักไทย',
    userEmail: 'somying.r@kku.ac.th',
    date: fmt(tomorrow),
    startTime: '08:30',
    endTime: '12:00',
    purpose: 'การประชุมคณะกรรมการบริหารมหาวิทยาลัย',
    participants: 50,
    status: 'pending',
    checklistCompleted: false,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'b6',
    roomId: 'r6',
    roomName: 'ห้องประชุมเฉลิมพระเกียรติ',
    building: 'อาคารสิริธร',
    userId: 'u3',
    userName: 'นาย วิชัย ศึกษา',
    userEmail: 'wichai.s@kku.ac.th',
    date: fmt(today),
    startTime: '15:00',
    endTime: '17:00',
    purpose: 'ประชุมเตรียมงานรับปริญญา',
    participants: 25,
    status: 'approved',
    checklistCompleted: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'b7',
    roomId: 'r1',
    roomName: 'ห้องประชุมสยาม 1',
    building: 'อาคารสยามทอง',
    userId: 'u1',
    userName: 'สมชาย ใจดี',
    userEmail: 'somchai.j@kku.ac.th',
    date: fmt(new Date(Date.now() - 86400000 * 7)),
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'ประชุมสรุปผลงานรอบเดือน',
    participants: 15,
    status: 'rejected',
    rejectionReason: 'ห้องประชุมถูกจองโดยคณะกรรมการในช่วงเวลาดังกล่าว กรุณาเลือกเวลาอื่น',
    checklistCompleted: false,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'c1',
    text: 'สวัสดีครับ! ยินดีต้อนรับสู่ระบบจองห้องประชุม มข. มีอะไรให้ช่วยไหมครับ?',
    sender: 'bot',
    timestamp: new Date().toISOString(),
  },
];

export const botResponses: string[] = [
  'คุณสามารถค้นหาห้องว่างได้ที่หน้า "ค้นหาห้องว่าง" ครับ โดยเลือกวันที่และช่วงเวลาที่ต้องการ',
  'การจองห้องประชุมต้องทำล่วงหน้าอย่างน้อย 24 ชั่วโมงครับ เพื่อให้ผู้ดูแลตรวจสอบได้ทันเวลา',
  'ห้องประชุมขอนแก่นรองรับผู้เข้าร่วมสูงสุด 60 ท่าน มีอุปกรณ์ครบครัน เหมาะสำหรับการประชุมใหญ่ครับ',
  'สถานะการจองสามารถตรวจสอบได้ที่หน้า "ประวัติการจอง" ครับ จะแสดงสถานะ รออนุมัติ / อนุมัติแล้ว / ปฏิเสธ',
  'หากต้องการยกเลิกการจอง สามารถกดปุ่ม "ยกเลิกการจอง" ในหน้าประวัติการจองได้ครับ',
  'การตรวจสภาพห้องต้องทำหลังใช้งานเสร็จ เพื่อยืนยันว่าอุปกรณ์และสถานที่อยู่ในสภาพที่เรียบร้อยครับ',
];

export const checklistItems = [
  { id: 'cl1', label: 'โปรเจคเตอร์ทำงานปกติ', icon: 'Monitor' },
  { id: 'cl2', label: 'ระบบเครื่องเสียงไม่มีปัญหา', icon: 'Volume2' },
  { id: 'cl3', label: 'ไวท์บอร์ดสะอาด', icon: 'PenLine' },
  { id: 'cl4', label: 'แอร์ทำงานปกติและปรับอุณหภูมิได้', icon: 'Wind' },
  { id: 'cl5', label: 'โต๊ะเก้าอี้เรียบร้อย', icon: 'Armchair' },
  { id: 'cl6', label: 'ไฟฟ้า/สวิตช์ทำงานปกติ', icon: 'Lightbulb' },
  { id: 'cl7', label: 'ไม่มีความเสียหายใดๆ', icon: 'ShieldCheck' },
  { id: 'cl8', label: 'ขยะถูกเก็บและทิ้งเรียบร้อย', icon: 'Trash2' },
];
