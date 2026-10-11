import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AppHeader } from '@/components/PhoneFrame';
import { Button } from '@/components/ui';
import { checklistItems } from '@/data/mockData';
import {
  Monitor, Volume2, PenLine, Wind, Armchair, Lightbulb, ShieldCheck,
  Trash2, CheckCircle2, Circle, Camera, AlertTriangle, Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Monitor, Volume2, PenLine, Wind, Armchair, Lightbulb, ShieldCheck, Trash2,
};

export function ChecklistScreen() {
  const { selectedBookingForChecklist, navigate, completeChecklist, currentUser } = useApp();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [note, setNote] = useState('');

  if (currentUser?.role !== 'admin') {
    navigate('accessDenied');
    return null;
  }

  if (!selectedBookingForChecklist) {
    navigate('admin');
    return null;
  }

  const allChecked = checklistItems.every((item) => checked[item.id]);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const handleSubmit = () => {
    completeChecklist(selectedBookingForChecklist.id);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col h-full bg-white">
        <AppHeader showBack={false} />
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <CheckCircle2 size={44} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">ตรวจสภาพห้องเรียบร้อย</h2>
          <p className="text-sm text-gray-500 mb-8">ขอบคุณที่ตรวจสอบสภาพห้องหลังการใช้งาน</p>
          <Button onClick={() => navigate('admin')} size="lg" className="w-full">
            กลับสู่แดชบอร์ดผู้ดูแล
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <AppHeader title="ตรวจสภาพห้อง" />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4">
        {/* Room info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
          <h2 className="font-bold text-gray-900 text-sm">{selectedBookingForChecklist.roomName}</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {selectedBookingForChecklist.building} · {selectedBookingForChecklist.date} · {selectedBookingForChecklist.startTime}–{selectedBookingForChecklist.endTime} น.
          </p>
        </div>

        {/* Instructions */}
        <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-3 mb-4">
          <AlertTriangle size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">
            กรุณาตรวจสอบสภาพห้องและอุปกรณ์หลังการใช้งาน หากพบปัญหาให้ระบุในช่องหมายเหตุ
          </p>
        </div>

        {/* Checklist items */}
        <div className="space-y-2.5 mb-4">
          {checklistItems.map((item) => {
            const Icon = iconMap[item.icon] ?? Circle;
            const isChecked = checked[item.id];
            return (
              <button
                key={item.id}
                onClick={() => setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left active:scale-[0.99] ${
                  isChecked
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isChecked ? 'bg-green-500' : 'bg-gray-100'
                }`}>
                  <Icon size={20} className={isChecked ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className={`flex-1 text-sm font-medium ${isChecked ? 'text-green-700' : 'text-gray-700'}`}>
                  {item.label}
                </span>
                {isChecked ? (
                  <CheckCircle2 size={22} className="text-green-500 shrink-0" />
                ) : (
                  <Circle size={22} className="text-gray-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Photo upload */}
        <button className="w-full py-8 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-gray-300 transition-colors flex flex-col items-center gap-1.5 mb-4">
          <Camera size={28} />
          <span className="text-sm font-medium">ถ่ายภาพหรืออัปโหลดรูปห้อง</span>
          <span className="text-xs">เพื่อเก็บเป็นหลักฐาน (ไม่บังคับ)</span>
        </button>

        {/* Notes */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">หมายเหตุ / ปัญหาที่พบ</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ระบุปัญหาหรือข้อสังเกตเพิ่มเติม..."
            rows={3}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-kku-red resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-gray-500 font-medium">
            ตรวจแล้ว {checkedCount}/{checklistItems.length} รายการ
          </span>
          <div className="flex gap-1">
            {checklistItems.map((item, i) => (
              <div
                key={item.id}
                className={`w-1.5 h-1.5 rounded-full ${i < checkedCount ? 'bg-green-500' : 'bg-gray-200'}`}
                style={{ marginLeft: i === 0 ? 0 : undefined }}
              />
            ))}
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={!allChecked} size="lg" className="w-full">
          <span className="flex items-center justify-center gap-2">
            <Check size={18} />
            ยืนยันผลการตรวจ
          </span>
        </Button>
        {!allChecked && (
          <p className="text-xs text-gray-400 text-center mt-1.5">กรุณาตรวจสอบครบทุกรายการ</p>
        )}
      </div>
    </div>
  );
}
