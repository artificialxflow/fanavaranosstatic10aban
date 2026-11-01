import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NewMeetingModal: React.FC = () => {
  const { isNewMeetingModalOpen, setIsNewMeetingModalOpen, addMeeting } = useApp();

  const [formData, setFormData] = useState({
    number: 'یکصد و نوزدهمین نشست رسمی',
    title: '',
    date: '۱۴۰۵/۰۸/۲۵',
    time: '۱۰:۰۰ الی ۱۳:۰۰',
    location: 'سالن کنفرانس شهید چمران - دبیرخانه مرکزی انجمن',
    agendaText: '',
    attendeesCount: 7,
    totalMembers: 7
  });

  if (!isNewMeetingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.agendaText) return;

    const agendaItems = formData.agendaText
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    addMeeting({
      number: formData.number,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      status: 'پیش‌رو',
      attendeesCount: formData.attendeesCount,
      totalMembers: formData.totalMembers,
      agendaItems: agendaItems.length > 0 ? agendaItems : ['بررسی پرونده‌های جاری'],
      resolutions: [],
      minutesSummary: 'دستور جلسه مصوب گردید و دعوتنامه به اعضای محترم ارسال شد.'
    });

    setIsNewMeetingModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-amber-600 text-white flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-calendar-plus"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                برنامه‌ریزی نشست جدید هیئت مدیره
              </h3>
              <p className="text-xs text-slate-500">تنظیم تاریخ، ساعت و دستور جلسه</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewMeetingModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">شماره و عنوان رسمی نشست</label>
            <input
              type="text"
              required
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">موضوع اصلی جلسه</label>
            <input
              type="text"
              required
              placeholder="مثال: بررسی صورت‌های مالی و تعیین اعضای کارگروه ارزیابی R&D"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">تاریخ برگزاری</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">ساعت جلسه</label>
              <input
                type="text"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">مکان برگزاری جلسه</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              موارد دستور جلسه (هر بند در یک خط)
            </label>
            <textarea
              rows={4}
              required
              placeholder="بند ۱: بررسی مکاتبات سازمان امور مالیاتی&#10;بند ۲: تصویب تقویم دوره‌های آموزشی پاییز&#10;بند ۳: پذیرش اعضای جدید"
              value={formData.agendaText}
              onChange={(e) => setFormData({ ...formData, agendaText: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewMeetingModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shadow-xs flex items-center gap-1.5"
            >
              <i className="fa-solid fa-calendar-check"></i>
              <span>ثبت و ارسال دعوتنامه</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
