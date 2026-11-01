import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IndustryTab, Circular } from '../../types';
import { RenewalModal } from './RenewalModal';

export const IndustryPanel: React.FC = () => {
  const {
    industryTab,
    setIndustryTab,
    companyProfile,
    updateCompanyProfile,
    documents,
    uploadDocument,
    removeDocument,
    circulars,
    academyItems,
    registerForAcademyItem,
    setIsRenewalModalOpen,
    showToast
  } = useApp();

  // Mobile sidebar drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Selected circular modal in member inbox
  const [selectedMemberCircular, setSelectedMemberCircular] = useState<Circular | null>(null);

  // Profile Form Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...companyProfile });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile(profileForm);
    setIsEditingProfile(false);
  };

  // Drag and Drop simulation handler
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const handleFileDrop = (e: React.DragEvent, docKey: string) => {
    e.preventDefault();
    setDragOverKey(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' مگابایت';
      uploadDocument(docKey, { name: file.name, size: sizeMB });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, docKey: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' مگابایت';
      uploadDocument(docKey, { name: file.name, size: sizeMB });
    }
  };

  const navItems: { id: IndustryTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'وضعیت عضویت و پیشخوان', icon: 'fa-id-card' },
    { id: 'profile', label: 'اطلاعات شرکت و بارگذاری مدارک', icon: 'fa-folder-open' },
    { id: 'inbox', label: 'کارپوشه ابلاغیه‌ها و نامه‌ها', icon: 'fa-inbox' },
    { id: 'academy', label: 'آکادمی R&D و تورهای صنعتی', icon: 'fa-graduation-cap' },
    { id: 'certification', label: 'استعلام و گواهی رسمی R&D', icon: 'fa-certificate' }
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col">
      {/* Mobile Bar */}
      <div className="lg:hidden bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center font-bold text-xs">
            <i className="fa-solid fa-industry"></i>
          </div>
          <span className="font-bold text-xs">پنل اعضای صنعت و بنگاه‌های R&D</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 rounded bg-slate-800 text-slate-200"
        >
          <i className="fa-solid fa-bars text-sm"></i>
        </button>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 right-0 z-40 w-64 bg-slate-900 text-slate-200 p-5 flex flex-col justify-between border-l border-slate-800 transform transition-transform duration-200 lg:static lg:translate-x-0 lg:rounded-2xl lg:border lg:shadow-xs lg:min-h-[85vh] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-6">
            {/* Header Brand */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <i className="fa-solid fa-industry text-sm"></i>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">
                    پرتال اعضای صنعت
                  </h2>
                  <span className="text-[10px] text-emerald-400 block font-medium">
                    سامانه تعاملی مراکز R&D
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

            {/* Member Enterprise Badge */}
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-building-circle-check"></i>
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white block truncate">
                    روناک الکترونیک
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    کد: {companyProfile.membershipCode}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700/60 text-[11px] flex justify-between items-center">
                <span className="text-slate-400">اعتبار عضویت:</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {companyProfile.membershipExpiry}
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 text-xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIndustryTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-medium transition-all ${
                    industryTab === item.id
                      ? 'bg-emerald-700 text-white shadow-xs font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} text-xs w-4 text-center`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Secretariat Contact Helper */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
            <button
              onClick={() => setIsRenewalModalOpen(true)}
              className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <i className="fa-solid fa-arrows-rotate text-xs"></i>
              <span>تمدید عضویت سالانه</span>
            </button>
            <div className="text-center text-[10px] text-slate-500">
              پشتیبانی فنی دبیرخانه: داخلی ۱۰۴
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {industryTab === 'overview' && (
            <div className="space-y-6">
              {/* Membership Status Certificate Hero Card */}
              <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 rounded-2xl border border-emerald-700/50 p-6 sm:p-8 text-white shadow-lg space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-2xl">
                      <i className="fa-solid fa-award"></i>
                    </div>
                    <div>
                      <span className="text-xs text-emerald-300 font-semibold block">
                        گواهینامه رسمی عضویت در انجمن تحقیق و توسعه صنایع
                      </span>
                      <h1 className="text-lg sm:text-2xl font-bold text-white">
                        {companyProfile.companyName}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold">
                      عضو فعال و دارای رتبه الف
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-slate-400 block text-[11px]">کد پروانه عضویت:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {companyProfile.membershipCode}
                    </span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-slate-400 block text-[11px]">تاریخ انقضای اعتبار:</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">
                      {companyProfile.membershipExpiry}
                    </span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-slate-400 block text-[11px]">شناسه ملی شرکت:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {companyProfile.nationalId}
                    </span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-slate-400 block text-[11px]">مدیر مرکز R&D:</span>
                    <span className="font-bold text-white text-sm">
                      {companyProfile.rdHeadName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-300 flex items-center gap-1.5">
                    <i className="fa-solid fa-shield-halved text-emerald-400"></i>
                    امکان استفاده از اعتبار مالیاتی موضوع ماده ۱۱ قانون جهش تولید دانش‌بنیان فعال است.
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsRenewalModalOpen(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-arrows-rotate"></i>
                      <span>درخواست تمدید دوره جدید</span>
                    </button>
                    <button
                      onClick={() => setIndustryTab('certification')}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-all"
                    >
                      مشاهده گواهی رسمی چاپی
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Overview Quick Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setIndustryTab('profile')}
                  className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs hover:border-emerald-500 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-800">وضعیت اسناد و مدارک</span>
                    <i className="fa-solid fa-folder-closed text-blue-700 text-base"></i>
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {documents.filter((d) => d.status.includes('تایید')).length} از {documents.length} مدرک تایید شده
                  </div>
                  <p className="text-[11px] text-slate-500">
                    روزنامه رسمی، پروانه صمت و مدارک مسئولین بارگذاری شده است.
                  </p>
                </div>

                <div
                  onClick={() => setIndustryTab('inbox')}
                  className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs hover:border-emerald-500 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-800">ابلاغیه‌های جدید کارپوشه</span>
                    <i className="fa-solid fa-envelope-open-text text-amber-600 text-base"></i>
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {circulars.length} بخشنامه رسمی
                  </div>
                  <p className="text-[11px] text-slate-500">
                    شامل دستورالعمل اجرایی معافیت‌های مالیاتی و تخفیف آزمایشگاهی.
                  </p>
                </div>

                <div
                  onClick={() => setIndustryTab('academy')}
                  className="bg-white p-5 rounded-xl border border-slate-300 shadow-xs hover:border-emerald-500 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-800">رویدادها و تورهای ثبت‌نامی</span>
                    <i className="fa-solid fa-bus-simple text-emerald-700 text-base"></i>
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {academyItems.filter((i) => i.isRegistered).length} رویداد رزرو شده
                  </div>
                  <p className="text-[11px] text-slate-500">
                    تور مگافکتوری مپنا و کارگاه حسابداری اعتبارات مالیاتی.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & DOCUMENT UPLOAD (فاز ۴: فرمهای اطلاعات حقوقی و ناحیه درگانددراپ) */}
          {industryTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    اطلاعات حقوقی بنگاه و بارگذاری مدارک الزامی R&D
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    ثبت مشخصات شرکت، مدیرعامل، مدیر تحقیق و توسعه و استعلام مدارک ثبتی
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 self-start md:self-auto"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>{isEditingProfile ? 'انصراف از ویرایش' : 'ویرایش اطلاعات شرکت'}</span>
                </button>
              </div>

              {/* Form 1: Legal Entity Info Form with distinct colorful/clean framed cards */}
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-3">
                  <i className="fa-solid fa-building text-blue-900"></i>
                  <span>مشخصات ثبتی و هویتی بنگاه صنعتی</span>
                </h3>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">نام کامل شرکت</label>
                        <input
                          type="text"
                          value={profileForm.companyName}
                          onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">شناسه ملی ۱۱ رقمی</label>
                        <input
                          type="text"
                          value={profileForm.nationalId}
                          onChange={(e) => setProfileForm({ ...profileForm, nationalId: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">شماره ثبت شرکت</label>
                        <input
                          type="text"
                          value={profileForm.regNumber}
                          onChange={(e) => setProfileForm({ ...profileForm, regNumber: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">رسته صنعتی و فعالیت</label>
                        <input
                          type="text"
                          value={profileForm.industrySector}
                          onChange={(e) => setProfileForm({ ...profileForm, industrySector: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">آدرس کارخانه / دفتر مرکزی</label>
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-emerald-700 text-white rounded-lg font-bold"
                      >
                        ذخیره تغییرات
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-200">
                      <span className="text-slate-500 block mb-1">نام ثبت‌شده شرکت:</span>
                      <span className="font-bold text-slate-900">{companyProfile.companyName}</span>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block mb-1">شناسه ملی و شماره ثبت:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {companyProfile.nationalId} / ثبت: {companyProfile.regNumber}
                      </span>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block mb-1">رسته تخصصی فعالیت:</span>
                      <span className="font-semibold text-slate-800">{companyProfile.industrySector}</span>
                    </div>
                    <div className="sm:col-span-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block mb-1">نشانی مستقر واحد تحقیق و توسعه:</span>
                      <span className="text-slate-800">{companyProfile.location}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form 2: Leadership Info (مدیرعامل و مسئول مرکز R&D) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CEO Box */}
                <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-200 pb-2">
                    <div className="w-7 h-7 rounded bg-blue-100 text-blue-900 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <span>مشخصات مدیرعامل شرکت</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">نام و نام خانوادگی:</span>
                      <span className="font-bold text-slate-900">{companyProfile.ceoName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">شماره تماس مستقیم:</span>
                      <span className="font-mono text-slate-700">{companyProfile.ceoPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">پست الکترونیکی:</span>
                      <span className="font-mono text-slate-700">{companyProfile.ceoEmail}</span>
                    </div>
                  </div>
                </div>

                {/* R&D Head Box */}
                <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-200 pb-2">
                    <div className="w-7 h-7 rounded bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-user-graduate"></i>
                    </div>
                    <span>مشخصات مسئول مرکز تحقیق و توسعه (R&D)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">نام و نام خانوادگی:</span>
                      <span className="font-bold text-slate-900">{companyProfile.rdHeadName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">شماره همراه رابط:</span>
                      <span className="font-mono text-slate-700">{companyProfile.rdHeadPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">تعداد کادر تخصصی R&D:</span>
                      <span className="font-bold text-emerald-800">{companyProfile.rdStaffCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form 3: Drag & Drop Documents Upload Area (ناحیه درگ‌اند‌دراپ برای بارگذاری مدارک الزامی) */}
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <i className="fa-solid fa-cloud-arrow-up text-emerald-700"></i>
                      <span>بارگذاری اسناد و مدارک قانونی (Drag & Drop)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      فرمت‌های مجاز: PDF، JPG، PNG تا حداکثر ۱۰ مگابایت برای هر سند
                    </p>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                    تاییدیه دبیرخانه الزامی است
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((doc) => {
                    const isUploaded = !!doc.fileName;
                    const isOver = dragOverKey === doc.key;

                    return (
                      <div
                        key={doc.key}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOverKey(doc.key);
                        }}
                        onDragLeave={() => setDragOverKey(null)}
                        onDrop={(e) => handleFileDrop(e, doc.key)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between text-xs ${
                          isOver
                            ? 'border-emerald-600 bg-emerald-50/80 scale-[1.01]'
                            : isUploaded
                            ? 'border-emerald-200 bg-emerald-50/30'
                            : 'border-dashed border-slate-300 bg-slate-50/70 hover:border-slate-400'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs">
                              {doc.title} {doc.isRequired && <span className="text-rose-500">*</span>}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                doc.status.includes('تایید')
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : doc.status.includes('بررسی')
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {doc.description}
                          </p>

                          {/* Uploaded File Pill */}
                          {isUploaded ? (
                            <div className="p-2.5 bg-white border border-emerald-200 rounded-lg flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 text-slate-800 truncate">
                                <i className="fa-solid fa-file-pdf text-rose-600"></i>
                                <span className="font-medium truncate">{doc.fileName}</span>
                                <span className="text-slate-400 font-mono text-[10px]">({doc.fileSize})</span>
                              </div>
                              <button
                                onClick={() => removeDocument(doc.key)}
                                className="text-rose-500 hover:text-rose-700 p-1"
                                title="حذف و جایگزینی فایل"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          ) : (
                            <div className="py-4 text-center border border-dashed border-slate-300 rounded-lg bg-white/60">
                              <i className="fa-solid fa-cloud-arrow-up text-slate-400 text-xl mb-1 block"></i>
                              <span className="text-slate-500 text-[11px] block">
                                فایل را به اینجا بکشید و رها کنید (Drag & Drop)
                              </span>
                            </div>
                          )}

                          {doc.verificationNote && (
                            <div className="text-[11px] text-emerald-800 bg-emerald-100/70 p-2 rounded">
                              <i className="fa-solid fa-circle-info ml-1"></i>
                              {doc.verificationNote}
                            </div>
                          )}
                        </div>

                        {/* File Input Action */}
                        <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">
                            {doc.uploadDate ? `تاریخ بارگذاری: ${doc.uploadDate}` : 'هنوز مدرکی ارسال نشده'}
                          </span>
                          <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-semibold transition-colors">
                            <span>{isUploaded ? 'جایگزینی فایل' : 'انتخاب فایل از سیستم'}</span>
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg"
                              className="hidden"
                              onChange={(e) => handleFileInputChange(e, doc.key)}
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEMBER INBOX & CIRCULARS (فاز ۴: کارپوشه اختصاصی ابلاغیه‌ها و دانلود پیوست) */}
          {industryTab === 'inbox' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    کارپوشه ابلاغیه‌ها، دعوتنامه‌ها و گزارش‌های تخصصی
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    نامه‌های رسمی صادر شده از سوی انجمن به همراه پیوست‌های با قابلیت دانلود مستقیم
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-lg text-xs font-bold self-start sm:self-auto">
                  تعداد کل پیام‌ها: {circulars.length} مورد
                </span>
              </div>

              <div className="space-y-4">
                {circulars.map((circ) => (
                  <div
                    key={circ.id}
                    className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-3 hover:border-slate-400 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded text-xs">
                          {circ.code}
                        </span>
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-bold">
                          {circ.priority}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-slate-500">
                        تاریخ ابلاغ: {circ.date}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {circ.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                      {circ.content}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="text-slate-500 text-[11px]">
                        مرجع صادرکننده: <strong className="text-slate-700">{circ.issuer}</strong>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedMemberCircular(circ)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium transition-colors"
                        >
                          مشاهده کامل ابلاغیه
                        </button>
                        <button
                          onClick={() => {
                            showToast({
                              type: 'success',
                              title: 'پیوست ابلاغیه دانلود شد',
                              description: `فایل «${circ.attachmentName || 'ضمیمه_رسمی.pdf'}» دریافت گردید.`
                            });
                          }}
                          className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <i className="fa-solid fa-download"></i>
                          <span>دانلود فایل پیوست</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ACADEMY & INDUSTRIAL TOURS */}
          {industryTab === 'academy' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    آکادمی آموزش تخصصی و تورهای فناوری صنعتی
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    ثبت‌نام مستقیم مدیران و پژوهشگران R&D در کارگاه‌های مهندسی و بازدید از مگافکتوری‌ها
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold self-start sm:self-auto">
                  تخفیف ۳۵٪ ویژه اعضای رسمی انجمن
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {academyItems.map((item) => {
                  const isRegistered = !!item.isRegistered;
                  const remainingCapacity = item.capacity - item.registeredCount;

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-xl border-2 p-5 shadow-xs flex flex-col justify-between text-xs space-y-4 transition-all ${
                        isRegistered ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                              item.type === 'تور فناوری و صنعتی'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-blue-100 text-blue-900'
                            }`}
                          >
                            {item.type}
                          </span>
                          <span className="font-mono text-slate-500 font-semibold">
                            تاریخ: {item.date}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-sm leading-snug">
                          {item.title}
                        </h3>

                        <div className="text-[11px] text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <div>
                            <strong className="text-slate-800">مدرس / میزبان:</strong> {item.instructorOrHost}
                          </div>
                          <div>
                            <strong className="text-slate-800">محل برگزاری:</strong> {item.location}
                          </div>
                          <div>
                            <strong className="text-slate-800">مدت دوره:</strong> {item.duration}
                          </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed pt-1">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span>
                            ظرفیت باقیمانده:{' '}
                            <strong className="text-blue-900 font-mono font-bold">
                              {remainingCapacity} نفر
                            </strong>
                          </span>
                          <span className="font-bold text-emerald-800 font-mono">
                            شهریه: {item.feeTomans.toLocaleString('fa-IR')} تومان
                          </span>
                        </div>

                        <button
                          onClick={() => registerForAcademyItem(item.id)}
                          className={`w-full py-2.5 rounded-lg font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                            isRegistered
                              ? 'bg-rose-50 border border-rose-300 text-rose-700 hover:bg-rose-100'
                              : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                          }`}
                        >
                          <i className={`fa-solid ${isRegistered ? 'fa-xmark' : 'fa-check'}`}></i>
                          <span>
                            {isRegistered
                              ? 'ثبت‌نام انجام شده است (لغو ثبت‌نام)'
                              : 'ثبت‌نام و رزرو سهمیه سازمانی'}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: CERTIFICATION & TAX EXEMPTION STATUS */}
          {industryTab === 'certification' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    گواهینامه رسمی صلاحیت و پروانه تحقیق و توسعه
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    نسخه دیجیتال و قابل استناد گواهی عضویت معتبر در سامانه ملی R&D
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <i className="fa-solid fa-print"></i>
                  <span>چاپ گواهینامه رسمی</span>
                </button>
              </div>

              {/* Dignified Institutional Certificate Display */}
              <div className="bg-white rounded-2xl border-4 border-slate-300 p-8 shadow-md relative overflow-hidden text-center space-y-6 max-w-3xl mx-auto">
                <div className="border-b-2 border-slate-800 pb-4 flex items-center justify-between text-right text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-blue-950 text-white flex items-center justify-center text-xl font-bold">
                      <i className="fa-solid fa-atom"></i>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">
                        جمهوری اسلامی ایران
                      </span>
                      <span className="text-xs text-slate-600 block">
                        انجمن مراکز تحقیق و توسعه صنایع و معادن
                      </span>
                    </div>
                  </div>

                  <div className="text-left font-mono text-[11px] space-y-0.5 text-slate-600">
                    <div>شماره گواهی: <span className="font-bold text-slate-900">{companyProfile.membershipCode}</span></div>
                    <div>تاریخ صدور: <span className="font-bold text-slate-900">۱۴۰۵/۰۱/۱۵</span></div>
                    <div>اعتبار تا: <span className="font-bold text-emerald-800">{companyProfile.membershipExpiry}</span></div>
                  </div>
                </div>

                <div className="space-y-3 py-2">
                  <h2 className="text-xl font-extrabold text-blue-950">
                    گواهینامه پروانه عضویت رسمی در انجمن مراکز تحقیق و توسعه
                  </h2>
                  <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                    بدینوسیله تایید می‌گردد واحد تحقیق و توسعه (R&D) مستقر در شرکت فوق‌الذکر پس از ارزیابی‌های میدانی، احراز صلاحیت پرسنلی و استانداردهای آزمایشگاهی، به عنوان عضو رسمی پیوسته پذیرفته شده است.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-right grid grid-cols-2 gap-3 max-w-xl mx-auto">
                  <div>
                    <span className="text-slate-500">نام بنگاه اقتصادی: </span>
                    <span className="font-bold text-slate-900">{companyProfile.companyName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">شناسه ملی: </span>
                    <span className="font-mono font-bold text-slate-900">{companyProfile.nationalId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">مدیر R&D: </span>
                    <span className="font-bold text-slate-900">{companyProfile.rdHeadName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">رتبه ارزیابی: </span>
                    <span className="font-bold text-emerald-800">رتبه الف مراکز فناوری</span>
                  </div>
                </div>

                {/* QR Code and Signatures simulation */}
                <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs px-4">
                  <div className="text-right">
                    <span className="font-bold text-slate-900 block">دکتر محمدرضا محمدی</span>
                    <span className="text-slate-500 text-[11px]">رئیس هیئت مدیره انجمن</span>
                  </div>

                  {/* QR Code Box */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-2 border-slate-800 p-1 flex items-center justify-center bg-white shadow-xs">
                      <i className="fa-solid fa-qrcode text-3xl text-slate-900"></i>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-1">کد تایید اصالت برخط</span>
                  </div>

                  <div className="text-left">
                    <span className="font-bold text-slate-900 block">مهندس حمید زمانی</span>
                    <span className="text-slate-500 text-[11px]">دبیرکل انجمن</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Member Inbox Circular Modal */}
      {selectedMemberCircular && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <span className="font-bold text-slate-900 text-xs">
                ابلاغیه شماره: {selectedMemberCircular.code}
              </span>
              <button
                onClick={() => setSelectedMemberCircular(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <h2 className="text-base font-bold text-slate-900">
                {selectedMemberCircular.title}
              </h2>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                {selectedMemberCircular.content}
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-medium text-blue-900">
                  پیوست: {selectedMemberCircular.attachmentName}
                </span>
                <button
                  onClick={() =>
                    showToast({
                      type: 'success',
                      title: 'پیوست دانلود شد',
                      description: 'فایل رسمی ضمیمه با موفقیت دریافت گردید.'
                    })
                  }
                  className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded font-medium"
                >
                  دانلود فایل
                </button>
              </div>
            </div>
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedMemberCircular(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Renewal Modal */}
      <RenewalModal />
    </div>
  );
};
