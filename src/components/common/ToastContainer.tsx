import React from 'react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgStyles = {
          success: 'bg-emerald-900/95 border-emerald-600 text-emerald-100',
          info: 'bg-slate-900/95 border-blue-500 text-blue-100',
          warning: 'bg-amber-900/95 border-amber-500 text-amber-100',
          error: 'bg-rose-900/95 border-rose-500 text-rose-100'
        }[toast.type];

        const iconClass = {
          success: 'fa-circle-check text-emerald-400',
          info: 'fa-circle-info text-blue-400',
          warning: 'fa-triangle-exclamation text-amber-400',
          error: 'fa-circle-xmark text-rose-400'
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-lg border shadow-xl backdrop-blur flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${bgStyles}`}
          >
            <i className={`fa-solid ${iconClass} text-lg shrink-0 mt-0.5`}></i>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight text-white mb-0.5">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-slate-300 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="بستن اعلان"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};
