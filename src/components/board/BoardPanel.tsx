import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BoardTab, Letter, FinancialTransaction } from '../../types';
import { BOARD_MEMBERS } from '../../data/mockData';
import { LetterDetailModal } from './LetterDetailModal';
import { NewLetterModal } from './NewLetterModal';
import { MeetingDetailModal } from './MeetingDetailModal';
import { NewMeetingModal } from './NewMeetingModal';
import { NewTransactionModal } from './NewTransactionModal';

export const BoardPanel: React.FC = () => {
  const {
    boardTab,
    setBoardTab,
    letters,
    setSelectedLetter,
    setIsNewLetterModalOpen,
    meetings,
    setSelectedMeeting,
    setIsNewMeetingModalOpen,
    transactions,
    setIsNewTxModalOpen,
    exportTransactionsToCSV,
    circulars,
    broadcastCircular,
    showToast
  } = useApp();

  // Mobile sidebar drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Letters tab search & filter
  const [letterSearch, setLetterSearch] = useState('');
  const [letterFilterType, setLetterFilterType] = useState<string>('همه');

  const filteredLetters = letters.filter((l) => {
    const matchesSearch =
      l.subject.includes(letterSearch) ||
      l.number.includes(letterSearch) ||
      l.senderOrRecipient.includes(letterSearch);
    if (letterFilterType === 'همه') return matchesSearch;
    if (letterFilterType === 'وارده') return matchesSearch && l.type === 'وارده';
    if (letterFilterType === 'صادره') return matchesSearch && l.type === 'صادره';
    if (letterFilterType === 'نیازمند پاراف') return matchesSearch && l.status === 'نیازمند پاراف';
    if (letterFilterType === 'بایگانی‌شده') return matchesSearch && l.status === 'بایگانی‌شده';
    return matchesSearch;
  });

  // Circular Form State
  const [circularForm, setCircularForm] = useState({
    code: `بخش-۱۴۰۵-${Math.floor(100 + Math.random() * 900)}`,
    title: '',
    priority: 'مهم' as const,
    targetAudience: 'کلیه صنایع عضو' as const,
    content: '',
    issuer: 'دبیرکل و هیئت مدیره انجمن مراکز تحقیق و توسعه',
    attachmentName: 'دستورالعمل_ابلاغی.pdf'
  });

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularForm.title || !circularForm.content) {
      showToast({
        type: 'warning',
        title: 'تکمیل فرم بخشنامه',
        description: 'لطفاً عنوان و متن بخشنامه را وارد فرمایید.'
      });
      return;
    }

    broadcastCircular({
      code: circularForm.code,
      title: circularForm.title,
      date: '۱۴۰۵/۰۸/۱۱',
      priority: circularForm.priority,
      targetAudience: circularForm.targetAudience,
      content: circularForm.content,
      issuer: circularForm.issuer,
      attachmentName: circularForm.attachmentName
    });

    setCircularForm({
      code: `بخش-۱۴۰۵-${Math.floor(100 + Math.random() * 900)}`,
      title: '',
      priority: 'مهم',
      targetAudience: 'کلیه صنایع عضو',
      content: '',
      issuer: 'دبیرکل و هیئت مدیره انجمن مراکز تحقیق و توسعه',
      attachmentName: 'دستورالعمل_ابلاغی.pdf'
    });
  };

  // Financial calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'واریز')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'برداشت')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const navItems: { id: BoardTab; label: string; icon: string; count?: number }[] = [
    { id: 'overview', label: 'پیشخوان راهبردی', icon: 'fa-chart-pie' },
    {
      id: 'letters',
      label: 'مکاتبات و کارتابل اداری',
      icon: 'fa-envelope-open-text',
      count: letters.filter((l) => l.status === 'نیازمند پاراف').length
    },
    {
      id: 'meetings',
      label: 'مدیریت جلسات و مصوبات',
      icon: 'fa-gavel',
      count: meetings.filter((m) => m.status === 'پیش‌رو').length
    },
    { id: 'finance', label: 'مالی و خزانه‌داری', icon: 'fa-wallet' },
    { id: 'circulars', label: 'صدور بخشنامه و اعلان', icon: 'fa-bullhorn' },
    { id: 'directory', label: 'اعضای هیئت مدیره', icon: 'fa-id-badge' }
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col">
      {/* Top Mobile Bar */}
      <div className="lg:hidden bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-amber-600 flex items-center justify-center font-bold text-xs">
            <i className="fa-solid fa-users-gear"></i>
          </div>
          <span className="font-bold text-xs">پنل هیئت مدیره انجمن</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 rounded bg-slate-800 text-slate-200"
        >
          <i className="fa-solid fa-bars text-sm"></i>
        </button>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar: Classic, structured & crisp */}
        <aside
          className={`fixed inset-y-0 right-0 z-40 w-64 bg-slate-900 text-slate-200 p-5 flex flex-col justify-between border-l border-slate-800 transform transition-transform duration-200 lg:static lg:translate-x-0 lg:rounded-2xl lg:border lg:shadow-xs lg:min-h-[85vh] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-6">
            {/* Header Brand */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <i className="fa-solid fa-users-gear text-sm"></i>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">
                    پنل هیئت مدیره
                  </h2>
                  <span className="text-[10px] text-amber-400 block font-medium">
                    دوره ششم مدیریت انجمن
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* User Profile Card */}
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-amber-600/30 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <span className="font-bold text-white block">دکتر محمدی</span>
                  <span className="text-[11px] text-slate-400 block">رئیس هیئت مدیره</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 flex justify-between">
                <span>سطح دسترسی:</span>
                <span className="text-amber-400 font-semibold">مدیریت عالی و امضا</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 text-xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setBoardTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium transition-all ${
                    boardTab === item.id
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <i className={`fa-solid ${item.icon} text-xs w-4 text-center`}></i>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Secretariat status footer */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between">
              <span>نشست بعدی:</span>
              <span className="text-amber-400 font-bold font-mono">۱۵ آبان</span>
            </div>
            <div className="flex items-center justify-between">
              <span>اتوماسیون:</span>
              <span className="text-emerald-400">نسخه ابری امن</span>
            </div>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {boardTab === 'overview' && (
            <div className="space-y-6">
              {/* Executive Welcome Banner */}
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>سامانه فرماندهی و تصمیم‌گیری هیئت مدیره</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    پیشخوان نظارتی و پایش مصوبات انجمن
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    گزارش تجمیعی کارتابل مکاتبات، نشست‌های پیش‌رو و وضعیت مالی خزانه‌داری
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsNewLetterModalOpen(true)}
                    className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-plus text-xs"></i>
                    <span>ثبت نامه جدید</span>
                  </button>
                  <button
                    onClick={() => setIsNewMeetingModalOpen(true)}
                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-calendar-plus text-xs"></i>
                    <span>تنظیم جلسه جدید</span>
                  </button>
                </div>
              </div>

              {/* 4 Classic KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-slate-700">نامه‌های نیازمند اقدام فوری</span>
                    <i className="fa-solid fa-fire-flame-curved text-rose-500 text-base"></i>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    {letters.filter((l) => l.priority === 'آنی' || l.priority === 'فوری').length}
                  </div>
                  <div className="text-[11px] text-rose-700 mt-1 font-medium">
                    نیازمند بررسی و پاراف رئیس هیئت مدیره
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-slate-700">مانده جاری خزانه‌داری</span>
                    <i className="fa-solid fa-coins text-emerald-600 text-base"></i>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-800 tabular-nums">
                    {netBalance.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-1">
                    وصولی ۸۶٪ حق عضویت‌های سالانه
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-slate-700">مصوبات در حال اجرا</span>
                    <i className="fa-solid fa-list-check text-blue-600 text-base"></i>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    ۱۴
                  </div>
                  <div className="text-[11px] text-blue-700 mt-1">
                    در کمیته‌های مالیاتی، آموزش و استاندارد
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-slate-700">کل بنگاه‌های صنعتی عضو</span>
                    <i className="fa-solid fa-industry text-amber-600 text-base"></i>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    ۲۸۵
                  </div>
                  <div className="text-[11px] text-amber-700 mt-1">
                    دارای پروانه رسمی تحقیق و توسعه
                  </div>
                </div>
              </div>

              {/* 2-Column Split: Recent Letters & Next Board Session */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Letters Card */}
                <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <i className="fa-solid fa-inbox text-blue-700"></i>
                      <span>آخرین نامه‌های رسیده به کارتابل</span>
                    </h3>
                    <button
                      onClick={() => setBoardTab('letters')}
                      className="text-xs text-blue-700 font-semibold hover:underline"
                    >
                      مشاهده همه ({letters.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {letters.slice(0, 3).map((letter) => (
                      <div
                        key={letter.id}
                        onClick={() => setSelectedLetter(letter)}
                        className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-white transition-all cursor-pointer text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-blue-900">{letter.number}</span>
                          <span className="text-[11px] text-slate-500">{letter.date}</span>
                        </div>
                        <div className="font-semibold text-slate-900 line-clamp-1">
                          {letter.subject}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span>{letter.senderOrRecipient}</span>
                          <span className="font-bold text-amber-700">{letter.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Meeting Card */}
                <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <i className="fa-solid fa-calendar-check text-amber-600"></i>
                      <span>نشست آتی هیئت مدیره انجمن</span>
                    </h3>
                    <button
                      onClick={() => setBoardTab('meetings')}
                      className="text-xs text-amber-700 font-semibold hover:underline"
                    >
                      تقویم جلسات
                    </button>
                  </div>

                  {meetings[0] && (
                    <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 text-sm">{meetings[0].number}</span>
                        <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                          {meetings[0].date}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 leading-snug">{meetings[0].title}</h4>
                      <div className="text-slate-600 space-y-1 text-[11px]">
                        <div><strong className="text-slate-700">مکان:</strong> {meetings[0].location}</div>
                        <div><strong className="text-slate-700">ساعت:</strong> {meetings[0].time}</div>
                      </div>

                      <div className="pt-2 border-t border-amber-200/80 flex justify-end">
                        <button
                          onClick={() => setSelectedMeeting(meetings[0])}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold transition-colors"
                        >
                          مشاهده دستور جلسه و مدارک
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LETTERS & CARTABLE */}
          {boardTab === 'letters' && (
            <div className="space-y-6">
              {/* Header Strip & Stats */}
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    کارتابل اداری و مکاتبات رسمی انجمن
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    ثبت، شماره‌گذاری، ارجاع، گردش کار و بایگانی نامه‌های وارده و صادره
                  </p>
                </div>
                <button
                  onClick={() => setIsNewLetterModalOpen(true)}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 self-start md:self-auto"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>ثبت نامه جدید (وارده/صادره)</span>
                </button>
              </div>

              {/* 3 Letters Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">نامه‌های وارده</span>
                    <div className="text-2xl font-bold text-slate-900 tabular-nums">
                      {letters.filter((l) => l.type === 'وارده').length}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center text-lg">
                    <i className="fa-solid fa-arrow-down-left"></i>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">در انتظار ارجاع و پاراف</span>
                    <div className="text-2xl font-bold text-amber-700 tabular-nums">
                      {letters.filter((l) => l.status === 'نیازمند پاراف').length}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-lg">
                    <i className="fa-solid fa-hourglass-half"></i>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">نامه‌های صادره انجمن</span>
                    <div className="text-2xl font-bold text-emerald-800 tabular-nums">
                      {letters.filter((l) => l.type === 'صادره').length}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg">
                    <i className="fa-solid fa-arrow-up-right"></i>
                  </div>
                </div>
              </div>

              {/* Letters Filter & Table */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Search Bar */}
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="جستجوی شماره، موضوع یا طرف مکاتبه..."
                      value={letterSearch}
                      onChange={(e) => setLetterSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-600"
                    />
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1 flex-wrap self-stretch sm:self-auto">
                    {['همه', 'وارده', 'صادره', 'نیازمند پاراف', 'بایگانی‌شده'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setLetterFilterType(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          letterFilterType === tab
                            ? 'bg-blue-900 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="p-3.5">نوع</th>
                        <th className="p-3.5">شماره ثبت</th>
                        <th className="p-3.5">موضوع مکاتبه</th>
                        <th className="p-3.5">طرف مکاتبه</th>
                        <th className="p-3.5">تاریخ</th>
                        <th className="p-3.5">اولویت</th>
                        <th className="p-3.5">وضعیت</th>
                        <th className="p-3.5 text-center">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredLetters.map((letter) => {
                        const priorityClass = {
                          عادی: 'text-slate-600',
                          فوری: 'text-amber-700 font-bold',
                          آنی: 'text-rose-700 font-extrabold'
                        }[letter.priority];

                        const statusClass = {
                          'در جریان': 'bg-blue-50 text-blue-700 border-blue-200',
                          'نیازمند پاراف': 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
                          'اقدام شده': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                          'بایگانی‌شده': 'bg-slate-100 text-slate-600 border-slate-200'
                        }[letter.status];

                        return (
                          <tr key={letter.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                  letter.type === 'وارده'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {letter.type}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                              {letter.number}
                            </td>
                            <td className="p-3.5 font-medium text-slate-800 max-w-xs truncate">
                              {letter.subject}
                            </td>
                            <td className="p-3.5 text-slate-600 max-w-[180px] truncate">
                              {letter.senderOrRecipient}
                            </td>
                            <td className="p-3.5 text-slate-500 font-mono whitespace-nowrap">
                              {letter.date}
                            </td>
                            <td className={`p-3.5 whitespace-nowrap ${priorityClass}`}>
                              {letter.priority}
                            </td>
                            <td className="p-3.5 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded border text-[11px] ${statusClass}`}>
                                {letter.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-center whitespace-nowrap">
                              <button
                                onClick={() => setSelectedLetter(letter)}
                                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-700 rounded transition-colors"
                              >
                                مشاهده و پاراف
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEETINGS & RESOLUTIONS */}
          {boardTab === 'meetings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    مدیریت جلسات، دستور جلسات و صورتجلسات هیئت مدیره
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    تقویم نشست‌ها، بایگانی دیجیتال مصوبات و نسخه چاپی صورتجلسات
                  </p>
                </div>
                <button
                  onClick={() => setIsNewMeetingModalOpen(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 self-start md:self-auto"
                >
                  <i className="fa-solid fa-calendar-plus"></i>
                  <span>برنامه‌ریزی نشست جدید</span>
                </button>
              </div>

              {/* Meetings List */}
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-4 hover:border-slate-400 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                            meeting.status === 'پیش‌رو'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {meeting.status}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {meeting.number}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                        <span>تاریخ: {meeting.date}</span>
                        <span>ساعت: {meeting.time}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {meeting.title}
                    </h4>

                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                      <div><strong className="text-slate-800">مکان برگزاری:</strong> {meeting.location}</div>
                      <div>
                        <strong className="text-slate-800">اعضای حاضر:</strong> {meeting.attendeesCount} نفر از {meeting.totalMembers} نفر اعضای هیئت مدیره
                      </div>
                    </div>

                    {/* Agenda Teaser */}
                    <div className="text-xs space-y-1.5">
                      <span className="font-bold text-slate-800 block">دستور جلسه نشست:</span>
                      <ul className="list-disc pr-4 text-slate-600 space-y-1">
                        {meeting.agendaItems.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="line-clamp-1">{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-slate-500">
                        تعداد مصوبات قطعی: <strong className="text-slate-800 font-bold">{meeting.resolutions.length} مورد</strong>
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedMeeting(meeting)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          <i className="fa-solid fa-file-lines"></i>
                          <span>مشاهده مشروح صورتجلسه</span>
                        </button>
                        <button
                          onClick={() => {
                            showToast({
                              type: 'success',
                              title: 'دانلود صورتجلسه آغاز شد',
                              description: 'فایل رسمی PDF صورتجلسه دریافت شد.'
                            });
                          }}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          <i className="fa-solid fa-file-pdf text-rose-600"></i>
                          <span>دانلود PDF رسمی</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FINANCE & TREASURY */}
          {boardTab === 'finance' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    امور مالی، خزانه‌داری و گزارش تراز سالانه
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    درآمدهای حاصل از حق عضویت، حامیان همایش، کارگاه‌ها و هزینه‌های جاری
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={exportTransactionsToCSV}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-file-excel"></i>
                    <span>خروجی فایل اکسل (CSV)</span>
                  </button>
                  <button
                    onClick={() => setIsNewTxModalOpen(true)}
                    className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-plus"></i>
                    <span>ثبت سند مالی جدید</span>
                  </button>
                </div>
              </div>

              {/* 3 Financial Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">مجموع درآمدهای تحقق‌یافته</span>
                  <div className="text-2xl font-extrabold text-emerald-700 tabular-nums mt-1">
                    {totalIncome.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    حق عضویت بنگاه‌ها و شهریه دوره‌ها
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">مجموع هزینه‌ها و مخارج اجرایی</span>
                  <div className="text-2xl font-extrabold text-rose-700 tabular-nums mt-1">
                    {totalExpense.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    اجاره سالن همایش، حق‌الزحمه اساتید و هاست
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">مانده خالص لحظه‌ای خزانه‌داری</span>
                  <div className="text-2xl font-extrabold text-blue-900 tabular-nums mt-1">
                    {netBalance.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">
                    وضعیت تراز: کاملاً مثبت و متوازن
                  </div>
                </div>
              </div>

              {/* Transactions Ledger Table */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <i className="fa-solid fa-book-open text-blue-800"></i>
                    <span>دفتر روزنامه و اسناد حسابداری خزانه‌داری</span>
                  </h3>
                  <span className="text-xs text-slate-500">
                    تعداد تراکنش‌های ثبت‌شده: <strong className="text-slate-800">{transactions.length}</strong>
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="p-3.5">نوع</th>
                        <th className="p-3.5">کد رهگیری</th>
                        <th className="p-3.5">تاریخ</th>
                        <th className="p-3.5">شرح تراکنش</th>
                        <th className="p-3.5">سرفصل</th>
                        <th className="p-3.5">مبلغ (تومان)</th>
                        <th className="p-3.5">طرف حساب</th>
                        <th className="p-3.5">وضعیت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                tx.type === 'واریز'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {tx.type}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-slate-700 whitespace-nowrap">
                            {tx.trackingCode}
                          </td>
                          <td className="p-3.5 font-mono text-slate-500 whitespace-nowrap">
                            {tx.date}
                          </td>
                          <td className="p-3.5 font-medium text-slate-900 max-w-xs truncate">
                            {tx.title}
                          </td>
                          <td className="p-3.5 text-slate-600 whitespace-nowrap">
                            {tx.category}
                          </td>
                          <td
                            className={`p-3.5 font-mono font-bold whitespace-nowrap ${
                              tx.type === 'واریز' ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {tx.amount.toLocaleString('fa-IR')}
                          </td>
                          <td className="p-3.5 text-slate-600 whitespace-nowrap">
                            {tx.sourceOrDestination}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                                tx.status === 'تایید شده'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BROADCAST CIRCULARS */}
          {boardTab === 'circulars' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs">
                <h1 className="text-xl font-bold text-slate-900">
                  صدور بخشنامه و اطلاع‌رسانی درون‌سازمانی به اعضا
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  ابلاغ دستورالعمل‌های معافیت مالیاتی، استانداردهای صنعتی و اطلاعیه‌های رسمی
                </p>
              </div>

              {/* Circular Draft Form */}
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-3">
                  <i className="fa-solid fa-bullhorn text-blue-800"></i>
                  <span>فرم صدور و ارسال بخشنامه جدید</span>
                </h3>

                <form onSubmit={handleBroadcastSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        شماره بخشنامه
                      </label>
                      <input
                        type="text"
                        required
                        value={circularForm.code}
                        onChange={(e) =>
                          setCircularForm({ ...circularForm, code: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        درجه اهمیت
                      </label>
                      <select
                        value={circularForm.priority}
                        onChange={(e) =>
                          setCircularForm({ ...circularForm, priority: e.target.value as any })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                      >
                        <option value="عادی">عادی</option>
                        <option value="مهم">مهم</option>
                        <option value="فوری و لازم‌الاجرا">فوری و لازم‌الاجرا</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        گروه مخاطبان صنعتی
                      </label>
                      <select
                        value={circularForm.targetAudience}
                        onChange={(e) =>
                          setCircularForm({
                            ...circularForm,
                            targetAudience: e.target.value as any
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                      >
                        <option value="کلیه صنایع عضو">کلیه صنایع عضو (سراسری)</option>
                        <option value="صنایع الکترونیک و ICT">صنایع الکترونیک و ICT</option>
                        <option value="صنایع دارویی و شیمیایی">صنایع دارویی و شیمیایی</option>
                        <option value="صنایع خودرو و قطعه‌سازی">صنایع خودرو و قطعه‌سازی</option>
                        <option value="صنایع معدنی و فلزی">صنایع معدنی و فلزی</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      عنوان و موضوع بخشنامه
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: دستورالعمل برخورداری از اعتبار مالیاتی تحقیق و توسعه سال ۱۴۰۵"
                      value={circularForm.title}
                      onChange={(e) =>
                        setCircularForm({ ...circularForm, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      متن مشروح بخشنامه
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="متن کامل بخشنامه یا ابلاغیه صادره از سوی هیئت مدیره..."
                      value={circularForm.content}
                      onChange={(e) =>
                        setCircularForm({ ...circularForm, content: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-slate-600">
                      <i className="fa-solid fa-paperclip text-blue-700"></i>
                      <span>فایل پیوست: {circularForm.attachmentName}</span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold shadow-xs flex items-center gap-2"
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                      <span>صدور و ابلاغ آنی به کارپوشه اعضا</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Broadcasted Circulars List */}
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-3 flex items-center justify-between">
                  <span>سوابق بخشنامه‌های ابلاغ‌شده اخیر</span>
                  <span className="text-xs text-slate-500 font-normal">
                    تعداد: {circulars.length} بخشنامه
                  </span>
                </h3>

                <div className="space-y-3">
                  {circulars.map((circ) => (
                    <div
                      key={circ.id}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-900">{circ.code}</span>
                          <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-semibold">
                            {circ.priority}
                          </span>
                        </div>
                        <span className="font-mono text-slate-500">{circ.date}</span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm">{circ.title}</h4>
                      <p className="text-slate-600 leading-relaxed line-clamp-2">{circ.content}</p>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                        <span>مخاطبان: <strong className="text-slate-700">{circ.targetAudience}</strong></span>
                        <span className="flex items-center gap-1 text-blue-700 font-semibold">
                          <i className="fa-solid fa-eye"></i>
                          <span>{circ.readCount} بازدید در کارپوشه</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BOARD DIRECTORY */}
          {boardTab === 'directory' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs">
                <h1 className="text-xl font-bold text-slate-900">
                  ترکیب اعضای هیئت مدیره و بازرسان قانونی
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  مشخصات ارکان منتخب مجمع عمومی انجمن مراکز تحقیق و توسعه
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BOARD_MEMBERS.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs flex items-start gap-4 text-xs"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center text-xl shrink-0">
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-bold">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{member.organization}</p>
                      <div className="text-[11px] text-slate-400 pt-1">
                        مدت مسئولیت: <span className="font-mono text-slate-600">{member.term}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Board Modals */}
      <LetterDetailModal />
      <NewLetterModal />
      <MeetingDetailModal />
      <NewMeetingModal />
      <NewTransactionModal />
    </div>
  );
};
