import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const RenewalModal: React.FC = () => {
  const { isRenewalModalOpen, setIsRenewalModalOpen, companyProfile, updateCompanyProfile, showToast } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'bank_slip'>('online');
  const [bankSlipNumber, setBankSlipNumber] = useState('');

  if (!isRenewalModalOpen) return null;

  const handleRenew = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile({
      membershipExpiry: '۲۹ اسفند ۱۴۰۶',
      membershipStatus: 'معتبر و تمدید شده تا پایان ۱۴۰۶'
    });
    setIsRenewalModalOpen(false);
    showToast({
      type: 'success',
      title: 'تمدید عضویت با موفقیت انجام شد',
      description: 'حق عضویت سالانه تسویه و اعتبار گواهینامه تا پایان سال ۱۴۰۶ تمدید گردید.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-arrows-rotate"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                درخواست تمدید عضویت سالانه واحد تحقیق و توسعه
              </h3>
              <p className="text-xs text-slate-500">کد عضویت: {companyProfile.membershipCode}</p>
            </div>
          </div>
          <button
            onClick={() => setIsRenewalModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleRenew} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Invoice Summary Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1.5 flex justify-between">
              <span>پیش‌فاکتور تمدید عضویت سالانه (دوره ۱۴۰۶)</span>
              <span className="font-mono text-blue-900">INV-1406-89</span>
            </div>
            <div className="flex justify-between text-slate-600 pt-1">
              <span>نام بنگاه:</span>
              <span className="font-bold text-slate-900">{companyProfile.companyName}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>تعرفه پایه عضویت حقوقی R&D:</span>
              <span className="font-mono">۴۵,۰۰۰,۰۰۰ تومان</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>تخفیف تمدید پیش از موعد (۱۰٪):</span>
              <span className="font-mono">۴,۵۰۰,۰۰۰- تومان</span>
            </div>
            <div className="flex justify-between text-slate-900 font-extrabold text-sm border-t border-slate-200 pt-2">
              <span>مبلغ نهایی قابل پرداخت:</span>
              <span className="text-emerald-800 font-mono">۴۰,۵۰۰,۰۰۰ تومان</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="block text-slate-700 font-medium">روش پرداخت حق عضویت:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('online')}
                className={`p-3 rounded-lg border text-right transition-all ${
                  paymentMethod === 'online'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <i className="fa-solid fa-credit-card text-emerald-600"></i>
                  <span>درگاه اینترنتی شتاب</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">پرداخت آنی و تمدید لحظه‌ای</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_slip')}
                className={`p-3 rounded-lg border text-right transition-all ${
                  paymentMethod === 'bank_slip'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <i className="fa-solid fa-receipt text-emerald-600"></i>
                  <span>فیش واریز بانکی</span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">واریز به حساب سیبا انجمن</p>
              </button>
            </div>
          </div>

          {paymentMethod === 'bank_slip' && (
            <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="block text-slate-700 font-medium">شماره پیگیری فیش بانکی:</label>
              <input
                type="text"
                required
                placeholder="مثال: ۸۹۰۳۴۵ بانک ملت"
                value={bankSlipNumber}
                onChange={(e) => setBankSlipNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-mono"
              />
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsRenewalModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold shadow-xs flex items-center gap-1.5"
            >
              <i className="fa-solid fa-circle-check"></i>
              <span>تایید پرداخت و تمدید اعتبار</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
