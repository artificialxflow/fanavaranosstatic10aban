import React from 'react';
import { useApp } from '../../context/AppContext';

export const NewsDetailModal: React.FC = () => {
  const { selectedNews, setSelectedNews, showToast } = useApp();

  if (!selectedNews) return null;

  const handleDownloadAttachment = () => {
    showToast({
      type: 'success',
      title: 'دانلود پیوست رسمی آغاز شد',
      description: 'فایل پیوست بخشنامه با موفقیت دریافت گردید.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-blue-700 font-medium">
            <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded">
              {selectedNews.category}
            </span>
            <span>·</span>
            <span className="text-slate-500 font-mono">{selectedNews.date}</span>
            <span>·</span>
            <span className="text-slate-500">{selectedNews.readTime}</span>
          </div>
          <button
            onClick={() => setSelectedNews(null)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <h2 className="text-xl font-bold text-slate-900 leading-snug">
            {selectedNews.title}
          </h2>

          <div className="text-xs text-slate-500 border-r-2 border-blue-600 pr-3 py-0.5">
            منتشرکننده: <span className="font-semibold text-slate-700">{selectedNews.author}</span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-medium bg-blue-50/60 p-3.5 rounded-lg border border-blue-100">
            {selectedNews.summary}
          </p>

          <div className="text-sm text-slate-600 leading-loose space-y-3 pt-2">
            <p>{selectedNews.content}</p>
            <p>
              واحدهای تحقیق و توسعه جهت بهره‌مندی از این امتیازات می‌توانند مستندات فازهای آزمایشگاهی و پایلوت خود را در سامانه بارگذاری نموده و تاییدیه رسمی شورای نظارت انجمن را دریافت نمایند.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-lg border">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <i className="fa-solid fa-paperclip text-blue-600 text-sm"></i>
              <span>پیوست رسمی: شیوه‌نامه_اجرایی_ابلاغیه.pdf (۱.۴ مگابایت)</span>
            </div>
            <button
              onClick={handleDownloadAttachment}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <i className="fa-solid fa-download"></i>
              <span>دانلود پیوست</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={() => setSelectedNews(null)}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};
