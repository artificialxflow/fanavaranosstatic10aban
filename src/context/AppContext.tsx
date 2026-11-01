import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppView,
  BoardTab,
  IndustryTab,
  Letter,
  BoardMeeting,
  FinancialTransaction,
  Circular,
  UploadedDoc,
  AcademyItem,
  NewsItem,
  ToastMessage
} from '../types';
import {
  INITIAL_LETTERS,
  INITIAL_MEETINGS,
  INITIAL_TRANSACTIONS,
  INITIAL_CIRCULARS,
  INITIAL_DOCUMENTS,
  INITIAL_ACADEMY,
  INITIAL_NEWS
} from '../data/mockData';

export interface CompanyProfile {
  companyName: string;
  nationalId: string;
  regNumber: string;
  industrySector: string;
  location: string;
  website: string;
  ceoName: string;
  ceoPhone: string;
  ceoEmail: string;
  rdHeadName: string;
  rdHeadPhone: string;
  rdHeadEmail: string;
  rdStaffCount: string;
  membershipStatus: string;
  membershipCode: string;
  membershipExpiry: string;
}

interface AppContextType {
  // Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  boardTab: BoardTab;
  setBoardTab: (tab: BoardTab) => void;
  industryTab: IndustryTab;
  setIndustryTab: (tab: IndustryTab) => void;

  // Letters
  letters: Letter[];
  addLetter: (letter: Omit<Letter, 'id'>) => void;
  updateLetterStatus: (id: string, status: Letter['status']) => void;
  selectedLetter: Letter | null;
  setSelectedLetter: (letter: Letter | null) => void;
  isNewLetterModalOpen: boolean;
  setIsNewLetterModalOpen: (open: boolean) => void;

  // Meetings
  meetings: BoardMeeting[];
  addMeeting: (meeting: Omit<BoardMeeting, 'id'>) => void;
  selectedMeeting: BoardMeeting | null;
  setSelectedMeeting: (meeting: BoardMeeting | null) => void;
  isNewMeetingModalOpen: boolean;
  setIsNewMeetingModalOpen: (open: boolean) => void;

  // Finance
  transactions: FinancialTransaction[];
  addTransaction: (tx: Omit<FinancialTransaction, 'id'>) => void;
  isNewTxModalOpen: boolean;
  setIsNewTxModalOpen: (open: boolean) => void;
  exportTransactionsToCSV: () => void;

  // Circulars
  circulars: Circular[];
  broadcastCircular: (circ: Omit<Circular, 'id' | 'readCount'>) => void;
  selectedCircular: Circular | null;
  setSelectedCircular: (circ: Circular | null) => void;

  // Industry Profile & Docs
  companyProfile: CompanyProfile;
  updateCompanyProfile: (data: Partial<CompanyProfile>) => void;
  documents: UploadedDoc[];
  uploadDocument: (docKey: string, file: { name: string; size: string }) => void;
  removeDocument: (docKey: string) => void;

  // Academy & Tours
  academyItems: AcademyItem[];
  registerForAcademyItem: (id: string) => void;

  // News
  newsItems: NewsItem[];
  selectedNews: NewsItem | null;
  setSelectedNews: (news: NewsItem | null) => void;

  // General Modals
  isRenewalModalOpen: boolean;
  setIsRenewalModalOpen: (open: boolean) => void;
  isMembershipAppModalOpen: boolean;
  setIsMembershipAppModalOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [boardTab, setBoardTab] = useState<BoardTab>('overview');
  const [industryTab, setIndustryTab] = useState<IndustryTab>('overview');

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Letters State
  const [letters, setLetters] = useState<Letter[]>(INITIAL_LETTERS);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isNewLetterModalOpen, setIsNewLetterModalOpen] = useState(false);

  const addLetter = (letterData: Omit<Letter, 'id'>) => {
    const newLetter: Letter = {
      ...letterData,
      id: 'let-' + Date.now()
    };
    setLetters((prev) => [newLetter, ...prev]);
    showToast({
      type: 'success',
      title: 'نامه جدید با موفقیت ثبت شد',
      description: `نامه شماره ${newLetter.number} در دبیرخانه سامانه ثبت و شماره‌گذاری گردید.`
    });
  };

  const updateLetterStatus = (id: string, status: Letter['status']) => {
    setLetters((prev) =>
      prev.map((letItem) => (letItem.id === id ? { ...letItem, status } : letItem))
    );
    showToast({
      type: 'info',
      title: 'وضعیت نامه به‌روزرسانی شد',
      description: `وضعیت به «${status}» تغییر یافت.`
    });
  };

  // Meetings State
  const [meetings, setMeetings] = useState<BoardMeeting[]>(INITIAL_MEETINGS);
  const [selectedMeeting, setSelectedMeeting] = useState<BoardMeeting | null>(null);
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState(false);

  const addMeeting = (meetingData: Omit<BoardMeeting, 'id'>) => {
    const newMeeting: BoardMeeting = {
      ...meetingData,
      id: 'meet-' + Date.now()
    };
    setMeetings((prev) => [newMeeting, ...prev]);
    showToast({
      type: 'success',
      title: 'نشست هیئت مدیره برنامه‌ریزی شد',
      description: `نشست ${newMeeting.number} در تاریخ ${newMeeting.date} با موفقیت ثبت و دعوتنامه‌ها ارسال شد.`
    });
  };

  // Finance State
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);
  const [isNewTxModalOpen, setIsNewTxModalOpen] = useState(false);

  const addTransaction = (txData: Omit<FinancialTransaction, 'id'>) => {
    const newTx: FinancialTransaction = {
      ...txData,
      id: 'tx-' + Date.now()
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast({
      type: 'success',
      title: 'سند مالی جدید ثبت شد',
      description: `تراکنش با کد پیگیری ${newTx.trackingCode} با موفقیت در دفاتر مالی ثبت گردید.`
    });
  };

  // Real CSV / Excel Export with UTF-8 BOM for perfect Persian encoding
  const exportTransactionsToCSV = () => {
    const headers = ['کد پیگیری', 'تاریخ', 'عنوان تراکنش', 'سرفصل حسابداری', 'مبلغ (تومان)', 'نوع', 'طرف حساب', 'وضعیت', 'شماره سند مرجع'];
    const rows = transactions.map((t) => [
      t.trackingCode,
      t.date,
      `"${t.title.replace(/"/g, '""')}"`,
      t.category,
      t.amount.toLocaleString('fa-IR'),
      t.type,
      `"${t.sourceOrDestination.replace(/"/g, '""')}"`,
      t.status,
      t.referenceDocNumber
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `گزارش_مالی_انجمن_تحقیق_توسعه_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast({
      type: 'success',
      title: 'خروجی اکسل آماده شد',
      description: 'فایل اکسل تراکنش‌ها با کدگذاری استاندارد فارسی دانلود گردید.'
    });
  };

  // Circulars State
  const [circulars, setCirculars] = useState<Circular[]>(INITIAL_CIRCULARS);
  const [selectedCircular, setSelectedCircular] = useState<Circular | null>(null);

  const broadcastCircular = (circData: Omit<Circular, 'id' | 'readCount'>) => {
    const newCirc: Circular = {
      ...circData,
      id: 'cir-' + Date.now(),
      readCount: 0
    };
    setCirculars((prev) => [newCirc, ...prev]);
    showToast({
      type: 'success',
      title: 'بخشنامه با موفقیت ابلاغ شد',
      description: `بخشنامه شماره ${newCirc.code} به کارپوشه کلیه مخاطبان مجاز ارسال گردید.`
    });
  };

  // Company Profile & Uploaded Documents
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    companyName: 'شرکت صنایع الکترونیک و اتوماسیون روناک (سهامی خاص)',
    nationalId: '۱۰۱۰۲۵۴۹۸۱۱',
    regNumber: '۴۳۱۹۸۲',
    industrySector: 'صنایع برق، الکترونیک، مخابرات و سامانه‌های هوشمند صنعتی',
    location: 'تهران - شهرک فناوری پردیس، بلوار نوآوری سوم، پلاک ۴۲',
    website: 'https://ronakelectronic.ir',
    ceoName: 'مهندس علی رضایی',
    ceoPhone: '۰۹۱۲۱۱۱۴۵۸۷',
    ceoEmail: 'a.rezaei@ronakelectronic.ir',
    rdHeadName: 'دکتر زهرا فرهمند',
    rdHeadPhone: '۰۹۱۲۳۴۵۶۷۸۹',
    rdHeadEmail: 'z.farahmand@ronakelectronic.ir',
    rdStaffCount: '۲۸ نفر کارشناس و پژوهشگر ارشد',
    membershipStatus: 'معتبر و فعال (رتبه الف صنایع پیشرفته)',
    membershipCode: 'RD-IND-1405-089',
    membershipExpiry: '۲۹ اسفند ۱۴۰۵'
  });

  const updateCompanyProfile = (data: Partial<CompanyProfile>) => {
    setCompanyProfile((prev) => ({ ...prev, ...data }));
    showToast({
      type: 'success',
      title: 'اطلاعات شرکت با موفقیت ذخیره شد',
      description: 'مشخصات حقوقی و مدیران در پایگاه داده اعضا به‌روزرسانی گردید.'
    });
  };

  const [documents, setDocuments] = useState<UploadedDoc[]>(INITIAL_DOCUMENTS);

  const uploadDocument = (docKey: string, file: { name: string; size: string }) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.key === docKey) {
          return {
            ...doc,
            fileName: file.name,
            fileSize: file.size,
            uploadDate: '۱۴۰۵/۰۸/۱۱',
            status: 'در حال بررسی دبیرخانه',
            verificationNote: 'سند به دبیرخانه فنی ارسال شد؛ نتیجه ارزیابی تا ۲۴ ساعت آینده اعلام می‌شود.'
          };
        }
        return doc;
      })
    );
    showToast({
      type: 'success',
      title: 'مدرک با موفقیت بارگذاری شد',
      description: `فایل «${file.name}» بارگذاری و به کارشناس مربوطه ارجاع گردید.`
    });
  };

  const removeDocument = (docKey: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.key === docKey) {
          return {
            ...doc,
            fileName: undefined,
            fileSize: undefined,
            uploadDate: undefined,
            status: 'بارگذاری نشده',
            verificationNote: undefined
          };
        }
        return doc;
      })
    );
    showToast({
      type: 'info',
      title: 'مدرک حذف گردید',
      description: 'امکان بارگذاری مجدد فایل اصلاح‌شده فعال است.'
    });
  };

  // Academy & Industrial Tours State
  const [academyItems, setAcademyItems] = useState<AcademyItem[]>(INITIAL_ACADEMY);

  const registerForAcademyItem = (id: string) => {
    setAcademyItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isCurrentlyReg = !!item.isRegistered;
          const newRegistered = !isCurrentlyReg;
          return {
            ...item,
            isRegistered: newRegistered,
            registeredCount: newRegistered ? item.registeredCount + 1 : item.registeredCount - 1
          };
        }
        return item;
      })
    );
    const target = academyItems.find((i) => i.id === id);
    if (target?.isRegistered) {
      showToast({
        type: 'info',
        title: 'لغو ثبت‌نام انجام شد',
        description: `انصراف شما از رویداد «${target?.title}» ثبت گردید.`
      });
    } else {
      showToast({
        type: 'success',
        title: 'ثبت‌نام با موفقیت انجام شد',
        description: `سهمیه شرکت روناک الکترونیک در «${target?.title}» رزرو و کارت ورود صادر شد.`
      });
    }
  };

  // News State
  const [newsItems] = useState<NewsItem[]>(INITIAL_NEWS);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Renewal & Membership Application Modals
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [isMembershipAppModalOpen, setIsMembershipAppModalOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        boardTab,
        setBoardTab,
        industryTab,
        setIndustryTab,
        letters,
        addLetter,
        updateLetterStatus,
        selectedLetter,
        setSelectedLetter,
        isNewLetterModalOpen,
        setIsNewLetterModalOpen,
        meetings,
        addMeeting,
        selectedMeeting,
        setSelectedMeeting,
        isNewMeetingModalOpen,
        setIsNewMeetingModalOpen,
        transactions,
        addTransaction,
        isNewTxModalOpen,
        setIsNewTxModalOpen,
        exportTransactionsToCSV,
        circulars,
        broadcastCircular,
        selectedCircular,
        setSelectedCircular,
        companyProfile,
        updateCompanyProfile,
        documents,
        uploadDocument,
        removeDocument,
        academyItems,
        registerForAcademyItem,
        newsItems,
        selectedNews,
        setSelectedNews,
        isRenewalModalOpen,
        setIsRenewalModalOpen,
        isMembershipAppModalOpen,
        setIsMembershipAppModalOpen,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
