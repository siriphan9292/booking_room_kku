import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AppHeader } from '@/components/PhoneFrame';
import { Users, MapPin, Clock, Search as SearchIcon, SlidersHorizontal, CalendarDays, Sparkles } from 'lucide-react';

export function SearchScreen() {
  const { rooms, navigate, setSelectedRoom } = useApp();
  const [searchText, setSearchText] = useState('');
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [endT, setEndT] = useState('');

  const filtered = rooms.filter((room) => {
    const matchText = !searchText || room.name.includes(searchText) || room.building.includes(searchText);
    const matchCap = !capacityFilter || room.capacity >= capacityFilter;
    return matchText && matchCap;
  });

  const handleSelect = (room: typeof rooms[0]) => {
    setSelectedRoom(room);
    navigate('booking');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <AppHeader showBack={false} />

      <div className="px-4 pt-5 pb-4 bg-gradient-to-br from-red-50 via-white to-amber-50 border-b border-red-100/70 shrink-0">
        <p className="text-[11px] uppercase tracking-[0.16em] text-kku-red font-bold">Daily overview</p>
        <h2 className="mt-1 text-[27px] leading-tight font-black tracking-tight text-gray-900">ภาพรวมการจองวันนี้<span className="text-kku-red">.</span></h2>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5"><CalendarDays size={15} className="text-kku-red" />{new Intl.DateTimeFormat('th-TH', { dateStyle: 'full' }).format(new Date())}</p>
        <div className="mt-4 rounded-2xl bg-kku-red px-4 py-3.5 text-white shadow-lg shadow-red-900/15 flex items-center gap-3 overflow-hidden relative">
          <div className="absolute -right-6 -top-8 w-28 h-28 rounded-full bg-white/10" />
          <Sparkles size={22} className="shrink-0 text-kku-gold" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white/75">พร้อมให้บริการ</p>
            <p className="text-base font-bold truncate">ค้นหาห้องที่เหมาะกับการประชุมของคุณ</p>
          </div>
          <span className="text-2xl font-black">{rooms.length}</span>
        </div>
      </div>

      {/* Search controls */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="ค้นหาชื่อห้อง / อาคาร..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-kku-red focus:bg-white transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`px-3 rounded-xl border transition-colors ${showFilters ? 'bg-kku-red text-white border-kku-red' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="flex gap-2 mt-2.5">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-kku-red"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-24 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-kku-red"
          />
          <input
            type="time"
            value={endT}
            onChange={(e) => setEndT(e.target.value)}
            className="w-24 px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-kku-red"
          />
        </div>

        {showFilters && (
          <div className="mt-3 animate-slide-up">
            <p className="text-xs font-semibold text-gray-500 mb-2">จำนวนผู้เข้าร่วมขั้นต่ำ</p>
            <div className="flex gap-2 flex-wrap">
              {[null, 10, 20, 30, 50].map((cap) => (
                <button
                  key={cap ?? 'all'}
                  onClick={() => setCapacityFilter(cap)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    capacityFilter === cap ? 'bg-kku-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cap === null ? 'ทั้งหมด' : `${cap}+ ท่าน`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          พบ {filtered.length} ห้องว่าง
        </p>

        <div className="space-y-3">
          {filtered.map((room) => (
            <button
              key={room.id}
              onClick={() => handleSelect(room)}
              className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-kku-red/30 hover:shadow-lg transition-all text-left active:scale-[0.99] group"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-white font-bold text-base">{room.name}</h3>
                    <p className="text-white/80 text-xs flex items-center gap-1">
                      <MapPin size={12} /> {room.building} · {room.floor}
                    </p>
                  </div>
                  <span className="text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <Users size={12} /> {room.capacity}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                  <Clock size={14} /> เปิดให้บริการ {room.openTime} - {room.closeTime} น.
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {room.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="text-[11px] px-2 py-0.5 bg-red-50 text-kku-red rounded-full font-medium">
                      {a}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-medium">
                      +{room.amenities.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <SearchIcon size={48} strokeWidth={1.5} />
            <p className="mt-3 text-sm">ไม่พบห้องที่ตรงกับเงื่อนไข</p>
          </div>
        )}
      </div>
    </div>
  );
}
