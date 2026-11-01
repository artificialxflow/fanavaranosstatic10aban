import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NewTransactionModal: React.FC = () => {
  const { isNewTxModalOpen, setIsNewTxModalOpen, addTransaction } = useApp();

  const [formData, setFormData] = useState({
    trackingCode: `TRX-1405-${Math.floor(1000 + Math.random() * 9000)}`,
    date: '۱۴۰۵/۰۸/۱۱',
    title: '',
    category: 'حق عضویت سالانه' as const,
    amount: 15000000,
    type: 'واریز' as 'واریز' | 'برداشت',
    sourceOrDestination: '',
    status: 'تایید شده' as const,
    referenceDocNumber: `فیش_${Math.floor(10000 + Math.random() * 90000)}`
  });

  if (!isNewTxModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    addTransaction(formData);
    setIsNewTxModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-emerald-700 text-white flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-file-invoice-dollar"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                ثبت سند مالی و خزانه‌داری
              </h3>
              <p className="text-xs text-slate-500">ثبت در دفاتر رسمی حسابداری انجمن</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewTxModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">نوع تراکنش</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="واریز">واریز به حساب انجمن (درآمد)</option>
                <option value="برداشت">برداشت از حساب انجمن (هزینه)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">کد رهگیری مالی</label>
              <input
                type="text"
                required
                value={formData.trackingCode}
                onChange={(e) => setFormData({ ...formData, trackingCode: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">شرح و عنوان تراکنش</label>
            <input
              type="text"
              required
              placeholder="مثال: واریز حق عضویت سالانه ۱۴۰۵ - شرکت پارس دارو"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">سرفصل حسابداری</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="حق عضویت سالانه">حق عضویت سالانه اعضا</option>
                <option value="کارگاه و آموزش">شهریه دوره‌ها و کارگاه‌های آکادمی</option>
                <option value="همایش ملی R&D">حامیان مالی و اسپانسری همایش</option>
                <option value="هزینه‌های جاری دبیرخانه">هزینه‌های جاری و اداری دبیرخانه</option>
                <option value="طرح‌های فناورانه مشترک">حمایت بلاعوض از طرح‌های تحقیقاتی</option>
                <option value="خدمات مشاوره">حق‌الزحمه مشاوران و ممیزان</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">مبلغ به تومان</label>
              <input
                type="number"
                required
                min={100000}
                step={50000}
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                {formData.type === 'واریز' ? 'واریزکننده (طرف حساب)' : 'دریافت‌کننده وجه'}
              </label>
              <input
                type="text"
                required
                placeholder="نام شرکت یا شخص..."
                value={formData.sourceOrDestination}
                onChange={(e) => setFormData({ ...formData, sourceOrDestination: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">شماره سند / فیش بانکی</label>
              <input
                type="text"
                required
                value={formData.referenceDocNumber}
                onChange={(e) => setFormData({ ...formData, referenceDocNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewTxModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold shadow-xs flex items-center gap-1.5"
            >
              <i className="fa-solid fa-check"></i>
              <span>ثبت قطعی در دفاتر مالی</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
