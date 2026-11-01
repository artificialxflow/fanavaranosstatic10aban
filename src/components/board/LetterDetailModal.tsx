import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const LetterDetailModal: React.FC = () => {
  const { selectedLetter, setSelectedLetter, updateLetterStatus, showToast } = useApp();
  const [parafInput, setParafInput] = useState('');

  if (!selectedLetter) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAddParaf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parafInput.trim()) return;
    updateLetterStatus(selectedLetter.id, 'اقدام شده');
    showToast({
      type: 'success',
      title: 'دستور و پاراف ثبت شد',
      description: 'دستور هیئت مدیره در گردش‌کار نامه ذخیره گردید.'
    });
    setParafInput('');
    setSelectedLetter(null);
  };

  const priorityBadge = {
    عادی: 'bg-slate-100 text-slate-700 border-slate-300',
    فوری: 'bg-amber-100 text-amber-800 border-amber-300',
    آنی: 'bg-rose-100 text-rose-800 border-rose-300'
  }[selectedLetter.priority];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-blue-900 text-white px-2.5 py-1 rounded">
              نامه {selectedLetter.type}
            </span>
            <span className="text-xs font-mono font-semibold text-slate-700">
              شماره: {selectedLetter.number}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="text-slate-600 hover:text-slate-900 px-2 py-1 rounded text-xs border border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-1"
              title="چاپ نامه رسمی"
            >
              <i className="fa-solid fa-print"></i>
              <span>چاپ</span>
            </button>
            <button
              onClick={() => setSelectedLetter(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        {/* Official Letterhead Representation */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Top Letterhead Bar */}
          <div className="border-b-2 border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-blue-900 text-white flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-atom"></i>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  انجمن مراکز تحقیق و توسعه صنایع و معادن
                </span>
                <span className="text-[10px] text-slate-500 block">
                  دبیرخانه مرکزی و سامانه اتوماسیون اداری
                </span>
              </div>
            </div>

            <div className="text-left font-mono space-y-0.5 text-slate-600 text-[11px]">
              <div>شماره: <span className="font-bold text-slate-900">{selectedLetter.number}</span></div>
              <div>تاریخ: <span className="font-bold text-slate-900">{selectedLetter.date}</span></div>
              <div>پیوست: <span className="font-bold text-slate-900">{selectedLetter.hasAttachment ? 'دارد' : 'ندارد'}</span></div>
            </div>
          </div>

          {/* Letter Info Strip */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500">طرف مکاتبه: </span>
              <span className="font-bold text-slate-900">{selectedLetter.senderOrRecipient}</span>
            </div>
            <div>
              <span className="text-slate-500">واحد اقدام‌کننده: </span>
              <span className="font-medium text-slate-800">{selectedLetter.department}</span>
            </div>
            <div>
              <span className="text-slate-500">درجه اهمیت: </span>
              <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-bold ${priorityBadge}`}>
                {selectedLetter.priority}
              </span>
            </div>
            <div>
              <span className="text-slate-500">وضعیت فعلی: </span>
              <span className="font-bold text-blue-800">{selectedLetter.status}</span>
            </div>
          </div>

          {/* Subject & Body */}
          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-slate-900 text-sm">
              موضوع: {selectedLetter.subject}
            </h3>
            <div className="p-4 bg-slate-50/70 rounded-lg border border-slate-200 text-slate-700 leading-relaxed text-xs">
              {selectedLetter.summary}
            </div>
          </div>

          {/* Attachment Box */}
          {selectedLetter.hasAttachment && selectedLetter.attachmentName && (
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-900 font-medium">
                <i className="fa-solid fa-file-pdf text-rose-600 text-base"></i>
                <span>پیوست: {selectedLetter.attachmentName}</span>
              </div>
              <button
                onClick={() =>
                  showToast({
                    type: 'success',
                    title: 'پیوست دانلود شد',
                    description: `فایل «${selectedLetter.attachmentName}» دریافت شد.`
                  })
                }
                className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-medium transition-colors"
              >
                <i className="fa-solid fa-download ml-1"></i>
                دانلود فایل
              </button>
            </div>
          )}

          {/* Paraf & Action Section */}
          <div className="border-t border-slate-200 pt-3 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <i className="fa-solid fa-signature text-amber-600"></i>
              <span>گردش کار و پاراف‌های ثبت‌شده</span>
            </h4>

            {selectedLetter.parafNote ? (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-slate-800">
                <div className="text-[11px] text-amber-800 font-bold mb-1">
                  پاراف هیئت مدیره:
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedLetter.parafNote}
                </p>
              </div>
            ) : (
              <p className="text-slate-400 italic">هنوز پارافی برای این نامه ثبت نشده است.</p>
            )}

            {/* Quick Paraf Form */}
            <form onSubmit={handleAddParaf} className="space-y-2 pt-1">
              <label className="block text-slate-700 font-medium">
                ثبت دستور / ارجاع جدید توسط هیئت مدیره:
              </label>
              <textarea
                rows={2}
                placeholder="متن دستور یا ارجاع به کمیسیون‌های مربوطه..."
                value={parafInput}
                onChange={(e) => setParafInput(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-xs"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => updateLetterStatus(selectedLetter.id, 'بایگانی‌شده')}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded text-xs font-medium"
                >
                  انتقال به بایگانی
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold shadow-xs flex items-center gap-1"
                >
                  <i className="fa-solid fa-check"></i>
                  <span>ثبت دستور و ارجاع</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
