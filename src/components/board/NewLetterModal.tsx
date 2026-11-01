import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NewLetterModal: React.FC = () => {
  const { isNewLetterModalOpen, setIsNewLetterModalOpen, addLetter } = useApp();

  const [formData, setFormData] = useState({
    type: 'وارده' as 'وارده' | 'صادره',
    number: `۱۴۰۵/${Math.floor(100 + Math.random() * 900)}`,
    subject: '',
    senderOrRecipient: '',
    date: '۱۴۰۵/۰۸/۱۱',
    priority: 'عادی' as 'عادی' | 'فوری' | 'آنی',
    status: 'در جریان' as const,
    department: 'دبیرخانه مرکزی انجمن',
    summary: '',
    hasAttachment: false,
    attachmentName: 'مستندات_پیوست.pdf'
  });

  if (!isNewLetterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.senderOrRecipient) return;

    addLetter({
      ...formData,
      status: formData.type === 'وارده' ? 'نیازمند پاراف' : 'اقدام شده'
    });

    setIsNewLetterModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-900 text-white flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                ثبت مکاتبه جدید در اتوماسیون اداری
              </h3>
              <p className="text-xs text-slate-500">شماره‌گذاری و ارجاع دبیرخانه انجمن</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewLetterModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">نوع مکاتبه</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="وارده">نامه وارده (دریافتی از صنایع یا سازمان‌ها)</option>
                <option value="صادره">نامه صادره (ارسالی از انجمن)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">شماره ثبت نامه</label>
              <input
                type="text"
                required
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                {formData.type === 'وارده' ? 'فرستنده (شرکت یا نهاد)' : 'گیرنده مکاتبه'}
              </label>
              <input
                type="text"
                required
                placeholder="مثال: شرکت نفت پارس / وزارت صنعت"
                value={formData.senderOrRecipient}
                onChange={(e) => setFormData({ ...formData, senderOrRecipient: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">تاریخ ثبت</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">درجه اهمیت / اولویت</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="عادی">عادی</option>
                <option value="فوری">فوری</option>
                <option value="آنی">آنی و بسیار مهم</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">واحد یا کمیسیون ارجاع</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="دبیرخانه مرکزی انجمن">دبیرخانه مرکزی انجمن</option>
                <option value="کمیته ارزیابی طرح‌های تحقیق و توسعه">کمیته ارزیابی طرح‌های تحقیق و توسعه</option>
                <option value="کمیته استاندارد و مالکیت فکری">کمیته استاندارد و مالکیت فکری</option>
                <option value="آکادمی آموزش و رویدادهای تخصصی">آکادمی آموزش و رویدادهای تخصصی</option>
                <option value="خزانه‌داری و امور مالی">خزانه‌داری و امور مالی</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">موضوع نامه</label>
            <input
              type="text"
              required
              placeholder="مثال: درخواست تاییدیه پروژه R&D جهت بهره‌مندی از معافیت مالیاتی"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">خلاصه متن / شرح مکاتبه</label>
            <textarea
              rows={3}
              required
              placeholder="شرح درخواست، مستندات همراه و نتیجه مورد تقاضا..."
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
            ></textarea>
          </div>

          {/* Attachment Toggle */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasAttachment}
                onChange={(e) => setFormData({ ...formData, hasAttachment: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span className="font-medium text-slate-700">دارای فایل پیوست رسمی (PDF/ZIP)</span>
            </label>
            {formData.hasAttachment && (
              <span className="text-slate-500 font-mono text-[11px]">پیوست ضمیمه شد</span>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewLetterModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold shadow-xs flex items-center gap-1.5"
            >
              <i className="fa-solid fa-check"></i>
              <span>ثبت نهایی و صدور شماره</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
