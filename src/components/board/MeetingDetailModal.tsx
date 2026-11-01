import React from 'react';
import { useApp } from '../../context/AppContext';

export const MeetingDetailModal: React.FC = () => {
  const { selectedMeeting, setSelectedMeeting, showToast } = useApp();

  if (!selectedMeeting) return null;

  const handleDownloadPDF = () => {
    showToast({
      type: 'success',
      title: 'دانلود صورتجلسه رسمی انجام شد',
      description: `فایل «${selectedMeeting.pdfFileName || 'صورتجلسه_هیئت_مدیره.pdf'}» با مهر و امضای دیجیتال دانلود گردید.`
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-amber-600 text-white px-2.5 py-1 rounded">
              {selectedMeeting.number}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              تاریخ: {selectedMeeting.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="text-blue-700 hover:text-blue-900 px-2.5 py-1 rounded text-xs border border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-1.5"
            >
              <i className="fa-solid fa-file-pdf text-rose-600"></i>
              <span>دانلود PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="text-slate-600 hover:text-slate-900 px-2 py-1 rounded text-xs border border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-1"
            >
              <i className="fa-solid fa-print"></i>
              <span>چاپ</span>
            </button>
            <button
              onClick={() => setSelectedMeeting(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {selectedMeeting.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-slate-500 mt-2 pt-2 border-t border-slate-100">
              <span><strong className="text-slate-700">زمان:</strong> {selectedMeeting.time}</span>
              <span><strong className="text-slate-700">مکان:</strong> {selectedMeeting.location}</span>
              <span><strong className="text-slate-700">حاضرین:</strong> {selectedMeeting.attendeesCount} از {selectedMeeting.totalMembers} عضو رسمی</span>
            </div>
          </div>

          {/* Agenda Items */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 border-b pb-1 border-slate-200">
              <i className="fa-solid fa-list-check text-blue-700"></i>
              <span>دستور جلسه مصوب نشست</span>
            </h4>
            <ul className="space-y-1.5 pr-4 list-disc text-slate-700 leading-relaxed">
              {selectedMeeting.agendaItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Resolutions */}
          {selectedMeeting.resolutions.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 border-b pb-1 border-slate-200">
                <i className="fa-solid fa-gavel text-amber-600"></i>
                <span>مصوبات لازم‌الاجرای هیئت مدیره</span>
              </h4>
              <div className="space-y-2">
                {selectedMeeting.resolutions.map((res, idx) => (
                  <div key={idx} className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">{res.code}</span>
                      <span className="text-[11px] text-slate-500">مهلت اقدام: {res.deadline}</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-medium">{res.text}</p>
                    <div className="text-[11px] text-slate-600">
                      مسئول پیگیری: <span className="font-semibold text-slate-800">{res.responsiblePerson}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary & Signatures Note */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 leading-relaxed">
            <div className="font-bold text-slate-800 mb-1">خلاصه مذاکرات و تایید نهایی:</div>
            <p>{selectedMeeting.minutesSummary}</p>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <i className="fa-solid fa-circle-check"></i>
                امضای دیجیتال تمامی اعضای حاضر در جلسه ثبت شده است
              </span>
              <span className="font-mono">کد امنیتی سند: 89A-SEC-1405</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={() => setSelectedMeeting(null)}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
