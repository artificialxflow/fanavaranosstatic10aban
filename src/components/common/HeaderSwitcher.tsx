import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';

export const HeaderSwitcher: React.FC = () => {
  const { currentView, setCurrentView, showToast } = useApp();

  const handleSwitch = (view: AppView) => {
    setCurrentView(view);
    const viewNames: Record<AppView, string> = {
      landing: 'سایت عمومی و ویترین انجمن',
      board: 'پنل اختصاصی هیئت مدیره',
      industry: 'پنل اختصاصی اعضای صنعت'
    };
    showToast({
      type: 'info',
      title: `ورود به ${viewNames[view]}`,
      description: 'دسترسی‌های مربوط به این بخش فعال شد.'
    });
  };

  return (
    <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left / Start: Official Logo & Portal Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            <i className="fa-solid fa-atom"></i>
          </div>
          <span className="font-semibold text-slate-200 hidden sm:inline">
            سامانه یکپارچه انجمن مراکز تحقیق و توسعه (R&D) صنایع و معادن
          </span>
          <span className="font-semibold text-slate-200 sm:hidden">
            انجمن R&D صنایع
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline font-mono">
            ۱۱ آبان ۱۴۰۵
          </span>
        </div>

        {/* Center: The Header Switcher */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-lg border border-slate-700/80 shadow-inner">
          <button
            onClick={() => handleSwitch('landing')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              currentView === 'landing'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
            title="مشاهده ویترین عمومی انجمن"
          >
            <i className="fa-solid fa-globe text-xs"></i>
            <span>سایت عمومی</span>
          </button>

          <button
            onClick={() => handleSwitch('board')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              currentView === 'board'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
            title="ورود به پنل مدیریت هیئت مدیره و کارتابل"
          >
            <i className="fa-solid fa-users-gear text-xs"></i>
            <span>پنل هیئت مدیره</span>
          </button>

          <button
            onClick={() => handleSwitch('industry')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              currentView === 'industry'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
            title="ورود به پنل شرکتهای عضو و متقاضی"
          >
            <i className="fa-solid fa-industry text-xs"></i>
            <span>پنل اعضای صنعت</span>
          </button>
        </div>

        {/* Right / End: Active Identity Pill */}
        <div className="hidden lg:flex items-center gap-2 text-slate-300 bg-slate-800/60 px-2.5 py-1 rounded border border-slate-700 text-xs">
          {currentView === 'landing' && (
            <>
              <i className="fa-solid fa-bullhorn text-blue-400"></i>
              <span>پرتال عمومی و ویترین اطلاع‌رسانی</span>
            </>
          )}
          {currentView === 'board' && (
            <>
              <i className="fa-solid fa-user-tie text-amber-400"></i>
              <span>کاربر: دکتر محمدی (رئیس هیئت مدیره)</span>
            </>
          )}
          {currentView === 'industry' && (
            <>
              <i className="fa-solid fa-building-circle-check text-emerald-400"></i>
              <span>شرکت روناک الکترونیک (عضو ۸۹)</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
