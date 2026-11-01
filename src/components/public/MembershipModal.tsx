import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MembershipModal: React.FC = () => {
  const { isMembershipAppModalOpen, setIsMembershipAppModalOpen, showToast, setCurrentView, setIndustryTab } = useApp();

  const [formData, setFormData] = useState({
    companyName: '',
    nationalId: '',
    industrySector: 'صنایع برق و الکترونیک',
    province: 'تهران',
    rdStaffCount: '۱۰ تا ۲۵ نفر',
    ceoName: '',
    contactPhone: '',
    contactEmail: ''
  });

  if (!isMembershipAppModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPhone) {
      showToast({
        type: 'warning',
        title: 'تکمیل فیلدهای الزامی',
        description: 'لطفاً نام شرکت و شماره تماس رابط را وارد فرمایید.'
      });
      return;
    }

    setIsMembershipAppModalOpen(false);
    showToast({
      type: 'success',
      title: 'پیش‌ثبت‌نام با موفقیت انجام شد',
      description: `پرونده موقت برای ${formData.companyName} ایجاد گردید. به پنل اعضا منتقل می‌شوید.`
    });

    // Seamlessly navigate to industry panel profile to upload documents
    setTimeout(() => {
      setCurrentView('industry');
      setIndustryTab('profile');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
              <i className="fa-solid fa-id-card"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                درخواست عضویت در انجمن مراکز تحقیق و توسعه
              </h3>
              <p className="text-xs text-slate-500">
                پذیرش و صدور پروانه عضویت رسمی سالانه R&D
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMembershipAppModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-blue-900 text-xs leading-relaxed">
            <i className="fa-solid fa-circle-check text-blue-600 ml-1.5"></i>
            عضویت در انجمن امکان استفاده از معافیت‌های مالیاتی تحقیق و توسعه، تخفیف شبکه آزمایشگاهی و حضور در مجامع سیاست‌گذاری را فراهم می‌آورد.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                نام کامل شرکت / بنگاه اقتصادی <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: شرکت صنایع الکترونیک پویا"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                شناسه ملی ۱۱ رقمی <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                maxLength={11}
                placeholder="مثال: ۱۰۱۰۳۴۸۵۹۲۰"
                value={formData.nationalId}
                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                رسته صنعتی و زمینه فعالیت
              </label>
              <select
                value={formData.industrySector}
                onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="صنایع برق و الکترونیک">صنایع برق، الکترونیک و اتوماسیون</option>
                <option value="صنایع دارویی و زیست‌فناوری">صنایع دارویی، شیمیایی و زیست‌فناوری</option>
                <option value="صنایع خودرو و قطعه‌سازی">صنایع خودرو و نیرو محرکه</option>
                <option value="صنایع فولاد و متالورژی">صنایع فولاد، فلزی و معدنی</option>
                <option value="صنایع غذایی و کشاورزی">صنایع غذایی، کشاورزی و تبدیل</option>
                <option value="فناوری اطلاعات و نرم‌افزار">نرم‌افزار و هوش مصنوعی صنعتی</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                استان محل استقرار کارخانه / دفتر
              </label>
              <select
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="تهران">تهران</option>
                <option value="البرز">البرز</option>
                <option value="اصفهان">اصفهان</option>
                <option value="خراسان رضوی">خراسان رضوی</option>
                <option value="فارس">فارس</option>
                <option value="آذربایجان شرقی">آذربایجان شرقی</option>
                <option value="خوزستان">خوزستان</option>
                <option value="قزوین">قزوین</option>
                <option value="مرکزی">مرکزی</option>
                <option value="سایر">سایر استان‌ها</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                نام مدیرعامل شرکت
              </label>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                value={formData.ceoName}
                onChange={(e) => setFormData({ ...formData, ceoName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                تعداد پرسنل مرکز R&D
              </label>
              <select
                value={formData.rdStaffCount}
                onChange={(e) => setFormData({ ...formData, rdStaffCount: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="کمتر از ۵ نفر">کمتر از ۵ نفر</option>
                <option value="۵ تا ۱۵ نفر">۵ تا ۱۵ نفر</option>
                <option value="۱۶ تا ۳۰ نفر">۱۶ تا ۳۰ نفر</option>
                <option value="بیش از ۳۰ نفر">بیش از ۳۰ نفر پژوهشگر</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                شماره همراه رابط / مدیر R&D <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                پست الکترونیکی رسمی
              </label>
              <input
                type="email"
                placeholder="info@company.ir"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-slate-500 text-xs">
              پس از ثبت فرم اولیه، مدارک رسمی در پنل بارگذاری خواهد شد.
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsMembershipAppModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>ثبت درخواست و ایجاد پرونده</span>
                <i className="fa-solid fa-arrow-left text-xs"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
