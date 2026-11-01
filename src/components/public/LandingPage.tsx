import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsDetailModal } from './NewsDetailModal';
import { MembershipModal } from './MembershipModal';

export const LandingPage: React.FC = () => {
  const {
    setCurrentView,
    setBoardTab,
    setIndustryTab,
    newsItems,
    setSelectedNews,
    setIsMembershipAppModalOpen,
    showToast
  } = useApp();

  const [newsFilter, setNewsFilter] = useState<string>('همه');
  const [inquiryCode, setInquiryCode] = useState<string>('');
  const [inquiryResult, setInquiryResult] = useState<{
    found: boolean;
    name?: string;
    status?: string;
    sector?: string;
    expiry?: string;
  } | null>(null);

  const [activeTabSection, setActiveTabSection] = useState<'charter' | 'org' | 'services'>('charter');

  const filteredNews =
    newsFilter === 'همه'
      ? newsItems
      : newsItems.filter((item) => item.category === newsFilter);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryCode.trim()) {
      showToast({
        type: 'warning',
        title: 'ورود کد رهگیری',
        description: 'لطفاً کد عضویت یا شناسه ملی واحد R&D را درج فرمایید.'
      });
      return;
    }

    if (inquiryCode.includes('089') || inquiryCode.includes('روناک') || inquiryCode.includes('1405')) {
      setInquiryResult({
        found: true,
        name: 'شرکت صنایع الکترونیک و اتوماسیون روناک (سهامی خاص)',
        status: 'عضو رسمی و فعال - دارای رتبه الف مراکز R&D',
        sector: 'صنایع برق، الکترونیک و اتوماسیون صنعتی',
        expiry: '۲۹ اسفند ۱۴۰۵ (معتبر)'
      });
      showToast({
        type: 'success',
        title: 'استعلام اصالت تایید شد',
        description: 'گواهینامه عضویت رسمی واحد تحقیق و توسعه معتبر است.'
      });
    } else {
      setInquiryResult({
        found: true,
        name: 'شرکت داروسازی پویا زیست فناور (عضو کد ۸۲)',
        status: 'عضو پیوسته انجمن - پروانه معتبر وزارت صمت',
        sector: 'صنایع دارویی و بیوتکنولوژی',
        expiry: '۲۹ اسفند ۱۴۰۵ (معتبر)'
      });
      showToast({
        type: 'success',
        title: 'استعلام اصالت تایید شد',
        description: 'اطلاعات گواهی عضویت در سامانه احراز گردید.'
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'پیام شما دریافت شد',
      description: 'کارشناسان دبیرخانه انجمن در اسرع وقت با شما تماس خواهند گرفت.'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Bar Contract Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-10 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-blue-900 border border-blue-700 text-white flex items-center justify-center text-xl font-bold shadow-xs">
              <i className="fa-solid fa-atom"></i>
            </div>
            <div>
              <span className="text-base lg:text-lg font-bold text-slate-900 tracking-tight block leading-tight">
                انجمن مراکز تحقیق و توسعه
              </span>
              <span className="text-[11px] text-blue-700 font-semibold block">
                صنایع و معادن ایران (R&D)
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-900 transition-colors whitespace-nowrap">
              معرفی و اساسنامه
            </a>
            <a href="#stats" className="hover:text-blue-900 transition-colors whitespace-nowrap">
              آمار و شاخص‌ها
            </a>
            <a href="#news" className="hover:text-blue-900 transition-colors whitespace-nowrap">
              اخبار و رویدادها
            </a>
            <a href="#inquiry" className="hover:text-blue-900 transition-colors whitespace-nowrap">
              استعلام گواهی R&D
            </a>
            <a href="#contact" className="hover:text-blue-900 transition-colors whitespace-nowrap">
              تماس با دبیرخانه
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsMembershipAppModalOpen(true)}
              className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <i className="fa-solid fa-file-pen text-xs"></i>
              <span>درخواست عضویت</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('industry');
                setIndustryTab('overview');
              }}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <i className="fa-solid fa-right-to-bracket text-xs text-emerald-700"></i>
              <span className="hidden sm:inline">ورود اعضا</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-14 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left/Start Column: Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-300 text-xs font-medium">
                <i className="fa-solid fa-award text-amber-400"></i>
                <span>مرجع تخصصی سیاست‌گذاری و توسعه نوآوری صنعتی کشور</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                پیشران نوآوری، هم‌افزایی فناوری و توسعه پایدار صنایع و معادن
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                انجمن مراکز تحقیق و توسعه با هدف پیوند پایدار صنعت، پژوهشگاه‌ها و دولت، بسترساز معافیت‌های مالیاتی ماده ۱۱ قانون جهش تولید دانش‌بنیان، ارتقای استاندارد آزمایشگاهی و توانمندسازی مدیران فناوری صنایع ایران است.
              </p>

              {/* Action Buttons Hub */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    setCurrentView('board');
                    setBoardTab('letters');
                  }}
                  className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-users-gear"></i>
                  <span>ورود به کارتابل هیئت مدیره</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('industry');
                    setIndustryTab('profile');
                  }}
                  className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-building-circle-arrow-right"></i>
                  <span>ورود به پنل اعضای صنعت</span>
                </button>

                <button
                  onClick={() => setIsMembershipAppModalOpen(true)}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>پذیرش عضو جدید</span>
                </button>
              </div>

              {/* Quick Trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-blue-400"></i>
                  معافیت مالیاتی قطعی R&D
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-blue-400"></i>
                  شبکه همکار ۵۴ آزمایشگاه مرجع
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-blue-400"></i>
                  اعطای نشان ملی تعالی سالانه
                </span>
              </div>
            </div>

            {/* Right/End Column: Interactive Institutional Crest & Infographic */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 shadow-2xl backdrop-blur-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                    <i className="fa-solid fa-diagram-project"></i>
                    سامانه هوشمند استعلام و خدمات اعضا
                  </span>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                    سامانه برخط
                  </span>
                </div>

                {/* Institutional Badge Visual Container */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/60 to-slate-900 border border-blue-500/30 p-6 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center text-blue-200 text-3xl shadow-inner">
                    <i className="fa-solid fa-microscope"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      پایگاه ملی تحقیق و توسعه صنایع
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      ثبت، رتبه‌بندی و نظارت بر طرح‌های فناورانه بنگاه‌های اقتصادی
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-right pt-2 border-t border-slate-700/80 text-xs">
                    <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700">
                      <span className="text-slate-400 block text-[11px]">آخرین بخشنامه مالیاتی:</span>
                      <span className="font-semibold text-amber-300">ماده ۱۱ قانون جهش تولید</span>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700">
                      <span className="text-slate-400 block text-[11px]">نشست پیش‌روی هیئت مدیره:</span>
                      <span className="font-semibold text-blue-300">۱۵ آبان - ساعت ۹:۳۰</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Pills in Hero */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setCurrentView('board');
                      setBoardTab('meetings');
                    }}
                    className="p-2.5 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 text-right transition-colors flex items-center justify-between"
                  >
                    <span>صورتجلسات هیئت مدیره</span>
                    <i className="fa-solid fa-chevron-left text-[10px] text-slate-400"></i>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('industry');
                      setIndustryTab('academy');
                    }}
                    className="p-2.5 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 text-right transition-colors flex items-center justify-between"
                  >
                    <span>تورهای فناوری و آموزش</span>
                    <i className="fa-solid fa-chevron-left text-[10px] text-slate-400"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Section (فاز ۲: کارتهای آمار کلیدی با کادرهای رنگی مشخص و بوردرهای تمیز) */}
      <section id="stats" className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              شاخص‌های کلیدی عملکرد و ارکان انجمن
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              آمار تجمیعی مراکز عضو، مکاتبات ثبت‌شده و نشست‌های راهبردی
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Stat Card 1: Members */}
            <div className="p-6 bg-blue-50/60 rounded-xl border border-blue-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-blue-900">مراکز عضو رسمی</span>
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg">
                  <i className="fa-solid fa-industry"></i>
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-blue-950 tabular-nums">
                  ۲۸۵+
                </div>
                <div className="text-xs text-blue-800 mt-1">
                  شرکت‌های صنعتی و دانش‌بنیان دارای پروانه R&D
                </div>
              </div>
            </div>

            {/* Stat Card 2: Correspondence */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-300 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-800">مکاتبات و پرونده‌ها</span>
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center text-lg">
                  <i className="fa-solid fa-envelope-open-text"></i>
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                  ۴,۲۵۰+
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  نامه وارده، صادره و پرونده معافیت مالیاتی
                </div>
              </div>
            </div>

            {/* Stat Card 3: Board & Committee Sessions */}
            <div className="p-6 bg-amber-50/60 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-amber-900">نشست‌ها و مصوبات</span>
                <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center text-lg">
                  <i className="fa-solid fa-gavel"></i>
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-amber-950 tabular-nums">
                  ۱۱۸
                </div>
                <div className="text-xs text-amber-800 mt-1">
                  جلسه رسمی هیئت مدیره و کمیسیون‌های فنی
                </div>
              </div>
            </div>

            {/* Stat Card 4: Academy & Tours */}
            <div className="p-6 bg-emerald-50/60 rounded-xl border border-emerald-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-emerald-900">دوره‌ها و تورهای صنعتی</span>
                <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-lg">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-950 tabular-nums">
                  ۷۸
                </div>
                <div className="text-xs text-emerald-800 mt-1">
                  کارگاه پتنت، ممیزی و تور بازدید از مگافکتوری‌ها
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official News & Circulars Section */}
      <section id="news" className="py-14 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold text-blue-700 mb-1">
                اطلاع‌رسانی رسمی و ابلاغیه‌ها
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                اخبار، بخشنامه‌ها و رویدادهای مراکز تحقیق و توسعه
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center flex-wrap gap-1 bg-white p-1 rounded-lg border border-slate-300 shadow-2xs">
              {['همه', 'بخشنامه دولتی', 'رویداد و همایش', 'فراخوان فناورانه'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNewsFilter(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    newsFilter === cat
                      ? 'bg-blue-900 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedNews(item)}
                className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="font-mono">{item.date}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-700 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-medium">
                  <span className="flex items-center gap-1">
                    <span>مطالعه کامل و پیوست‌ها</span>
                    <i className="fa-solid fa-arrow-left text-[10px] group-hover:-translate-x-1 transition-transform"></i>
                  </span>
                  <span className="text-slate-400 text-[11px]">{item.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry & Verification Widget (استعلام اصالت عضویت) */}
      <section id="inquiry" className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="text-center max-w-lg mx-auto mb-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xl mb-3 shadow-xs">
                <i className="fa-solid fa-certificate"></i>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                سامانه استعلام اصالت گواهی و پروانه عضویت R&D
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                جهت احراز صلاحیت مراکز تحقیق و توسعه در مناقصات، تسهیلات و معافیت‌های مالیاتی
              </p>
            </div>

            <form onSubmit={handleInquiry} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="text"
                placeholder="کد عضویت (مثال: 089) یا شناسه ملی شرکت..."
                value={inquiryCode}
                onChange={(e) => setInquiryCode(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue-600 font-mono shadow-2xs"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>استعلام آنلاین</span>
              </button>
            </form>

            {/* Inquiry Result Display */}
            {inquiryResult && (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-slate-800 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                  <i className="fa-solid fa-circle-check text-emerald-600"></i>
                  <span>اطلاعات گواهی عضویت معتبر در سامانه مرکزی</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-emerald-200">
                  <div>
                    <span className="text-slate-500">نام بنگاه اقتصادی: </span>
                    <span className="font-bold text-slate-900">{inquiryResult.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">وضعیت گواهینامه: </span>
                    <span className="font-bold text-emerald-800">{inquiryResult.status}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">رسته تخصصی: </span>
                    <span className="text-slate-700">{inquiryResult.sector}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">تاریخ اعتبار پروانه: </span>
                    <span className="font-mono font-bold text-slate-900">{inquiryResult.expiry}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Charter, Organizational Chart & Services Tabbed Section */}
      <section id="about" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              ارکان، اساسنامه و خدمات تخصصی انجمن
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ساختار قانونی و ظرفیت‌های حمایتی از جامعه پژوهشگران و مدیران R&D
            </p>

            <div className="flex justify-center gap-2 mt-5">
              <button
                onClick={() => setActiveTabSection('charter')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTabSection === 'charter'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                اهداف و اساسنامه
              </button>
              <button
                onClick={() => setActiveTabSection('org')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTabSection === 'org'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                چارت سازمانی و ارکان
              </button>
              <button
                onClick={() => setActiveTabSection('services')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTabSection === 'services'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                بسته خدمات جامع اعضا
              </button>
            </div>
          </div>

          {/* Tab 1: Charter */}
          {activeTabSection === 'charter' && (
            <div className="bg-white rounded-xl border border-slate-300 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-5 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-scroll text-blue-700"></i>
                <span>گزیده اساسنامه رسمی انجمن مراکز تحقیق و توسعه</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 inline-flex items-center justify-center text-[10px]">۱</span>
                    <span>توسعه زیرساخت تحقیق</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    ایجاد پایگاه داده ملی آزمایشگاه‌ها، هدایت منابع مالیاتی ماده ۱۱ به سمت پروژه‌های با ارزش افزوده بالا در صنایع کلیدی.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 inline-flex items-center justify-center text-[10px]">۲</span>
                    <span>حمایت از مالکیت فکری</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    تدوین پتنت‌های بین‌المللی، جلوگیری از نقض حقوق معنوی مخترعان و مشاوره تجاری‌سازی یافته‌های فناورانه بنگاه‌ها.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 inline-flex items-center justify-center text-[10px]">۳</span>
                    <span>همگرایی صنعت و دانشگاه</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    تعریف پایان‌نامه‌های تقاضامحور، پسا‌دکتری صنعتی و عقد قراردادهای پژوهشی مشترک با پژوهشگاه‌های برتر کشور.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Org Chart */}
          {activeTabSection === 'org' && (
            <div className="bg-white rounded-xl border border-slate-300 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-sitemap text-amber-600"></i>
                <span>ساختار حاکمیتی و کمیسیون‌های تخصصی انجمن</span>
              </h3>
              <div className="flex flex-col items-center gap-3 text-xs">
                {/* Level 1 */}
                <div className="px-5 py-2.5 bg-blue-900 text-white rounded-lg font-bold text-center shadow-xs">
                  مجمع عمومی نمایندگان مراکز R&D صنایع
                </div>
                <i className="fa-solid fa-arrow-down text-slate-400 text-xs"></i>
                {/* Level 2 */}
                <div className="px-5 py-2.5 bg-amber-600 text-white rounded-lg font-bold text-center shadow-xs">
                  هیئت مدیره منتخب (۷ عضو اصلی و ۲ عضو علی‌البدل) + بازرس قانونی
                </div>
                <i className="fa-solid fa-arrow-down text-slate-400 text-xs"></i>
                {/* Level 3 */}
                <div className="px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold text-center">
                  دبیرکل و دبیرخانه اجرایی انجمن
                </div>
                <i className="fa-solid fa-arrow-down text-slate-400 text-xs"></i>
                {/* Level 4: Committees */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                    <span className="font-bold text-slate-900 block mb-1">کمیته آموزش و رویداد</span>
                    <span className="text-[11px] text-slate-500">برگزاری کارگاه و تور</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                    <span className="font-bold text-slate-900 block mb-1">کمیته مالکیت فکری</span>
                    <span className="text-[11px] text-slate-500">پتنت و دعاوی حقوقی</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                    <span className="font-bold text-slate-900 block mb-1">کمیته استاندارد و آزمایشگاه</span>
                    <span className="text-[11px] text-slate-500">ISO 17025 و صحه‌گذاری</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                    <span className="font-bold text-slate-900 block mb-1">کمیته ارزیابی مالیاتی</span>
                    <span className="text-[11px] text-slate-500">ماده ۱۱ جهش تولید</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Services */}
          {activeTabSection === 'services' && (
            <div className="bg-white rounded-xl border border-slate-300 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-handshake-angle text-emerald-600"></i>
                <span>بسته‌های خدمت‌رسانی به بنگاه‌های صنعتی عضو</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <i className="fa-solid fa-receipt text-blue-700 text-lg mt-0.5"></i>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">مشاوره تخصصی اعتبار مالیاتی R&D</h4>
                    <p className="text-slate-600">تهیه پرونده قابل دفاع در سازمان امور مالیاتی کشور و استرداد مالیات خرید تجهیزات.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <i className="fa-solid fa-vial-virus text-emerald-700 text-lg mt-0.5"></i>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">یارانه شبکه آزمایشگاهی همکار</h4>
                    <p className="text-slate-600">تخفیف ۳۵ درصدی در ۵۴ آزمایشگاه همکار دانشگاهی جهت آنالیزهای میکروسکوپی و متالورژی.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <i className="fa-solid fa-bus-simple text-amber-600 text-lg mt-0.5"></i>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">تورهای انتقال تجربه فناوری</h4>
                    <p className="text-slate-600">بازدیدهای صنعتی از مگافکتوری‌ها و خطوط پیشرفته جهت بنچ‌مارکینگ فرآیندهای مهندسی.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <i className="fa-solid fa-medal text-rose-600 text-lg mt-0.5"></i>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">اعطای نشان ملی تعالی R&D</h4>
                    <p className="text-slate-600">ممیزی، رتبه‌بندی و صدور تندیس بلورین نوآوری در اجلاس سراسری سالانه.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-200 pt-12 pb-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1: About & Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  <i className="fa-solid fa-atom"></i>
                </div>
                <span className="font-bold text-white text-base">
                  انجمن مراکز تحقیق و توسعه (R&D) صنایع و معادن
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                تشکل ملی و مرجع قانونی پیوند واحدهای تحقیق و توسعه با سیاست‌گذاران صنعتی کشور، مستقر در پارک فناوری و دارای مجوز رسمی از مراجع قانونی.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-phone text-blue-400"></i>
                  <span className="font-mono">۰۲۱-۸۸۴۵۹۲۱۰</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-envelope text-blue-400"></i>
                  <span className="font-mono">secretariat@iran-rd.org</span>
                </span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-xs tracking-wider uppercase">دسترسی سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('board');
                      setBoardTab('overview');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    پیشخوان هیئت مدیره و کارتابل
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('industry');
                      setIndustryTab('profile');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    پنل شرکتهای عضو و بارگذاری مدارک
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsMembershipAppModalOpen(true)}
                    className="hover:text-white transition-colors"
                  >
                    درخواست صدور گواهی عضویت
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('industry');
                      setIndustryTab('academy');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    تقویم کارگاه‌های آموزشی آکادمی R&D
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Secretariat Contact Form */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-bold text-white text-xs tracking-wider uppercase">
                پیام مستقیم به دبیرخانه انجمن
              </h4>
              <form onSubmit={handleContactSubmit} className="space-y-2 text-xs">
                <input
                  type="text"
                  required
                  placeholder="نام و نام خانوادگی یا شرکت..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="متن پیام یا پرسش اداری..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-700 hover:bg-blue-600 text-white rounded font-medium transition-colors"
                >
                  ارسال پیام به دبیرخانه
                </button>
              </form>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <span>© کلیه حقوق مادی و معنوی متعلق به انجمن مراکز تحقیق و توسعه صنایع و معادن ایران است.</span>
            <span className="font-mono">سامانه نسخه ۴.۵ - ۱۴۰۵ هجری خورشیدی</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NewsDetailModal />
      <MembershipModal />
    </div>
  );
};
