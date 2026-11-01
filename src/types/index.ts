/**
 * Types for Association of Research & Development Centers Portal
 */

export type AppView = 'landing' | 'board' | 'industry';

export type BoardTab = 'overview' | 'letters' | 'meetings' | 'finance' | 'circulars' | 'directory';

export type IndustryTab = 'overview' | 'profile' | 'inbox' | 'academy' | 'certification';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}

// Letter / Correspondence
export interface Letter {
  id: string;
  number: string;
  subject: string;
  senderOrRecipient: string;
  type: 'وارده' | 'صادره';
  date: string;
  priority: 'عادی' | 'فوری' | 'آنی';
  status: 'در جریان' | 'بایگانی‌شده' | 'اقدام شده' | 'نیازمند پاراف';
  summary: string;
  department: string;
  hasAttachment: boolean;
  attachmentName?: string;
  parafNote?: string;
}

// Board Meeting & Minutes
export interface BoardMeeting {
  id: string;
  number: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'برگزار شده' | 'پیش‌رو' | 'لغو شده';
  attendeesCount: number;
  totalMembers: number;
  agendaItems: string[];
  resolutions: {
    code: string;
    text: string;
    responsiblePerson: string;
    deadline: string;
  }[];
  minutesSummary: string;
  pdfFileName?: string;
}

// Financial Transaction
export interface FinancialTransaction {
  id: string;
  trackingCode: string;
  date: string;
  title: string;
  category: 'حق عضویت سالانه' | 'کارگاه و آموزش' | 'همایش ملی R&D' | 'هزینه‌های جاری دبیرخانه' | 'طرح‌های فناورانه مشترک' | 'خدمات مشاوره';
  amount: number; // In Tomans or Rials
  type: 'واریز' | 'برداشت';
  sourceOrDestination: string;
  status: 'تایید شده' | 'در انتظار تایید' | 'رد شده';
  referenceDocNumber: string;
}

// Broadcast Circular / Announcement
export interface Circular {
  id: string;
  code: string;
  title: string;
  date: string;
  priority: 'عادی' | 'مهم' | 'فوری و لازم‌الاجرا';
  targetAudience: 'کلیه صنایع عضو' | 'صنایع الکترونیک و ICT' | 'صنایع دارویی و شیمیایی' | 'صنایع خودرو و قطعه‌سازی' | 'صنایع معدنی و فلزی';
  content: string;
  issuer: string;
  attachmentName?: string;
  readCount: number;
}

// Industry Member Uploaded Document
export interface UploadedDoc {
  id: string;
  key: string;
  title: string;
  description: string;
  isRequired: boolean;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  status: 'بارگذاری نشده' | 'در حال بررسی دبیرخانه' | 'تایید شده و معتبر' | 'نیازمند اصلاح';
  verificationNote?: string;
}

// Academy Course & Industrial Tour
export interface AcademyItem {
  id: string;
  type: 'دوره آموزشی' | 'تور فناوری و صنعتی';
  title: string;
  instructorOrHost: string;
  duration: string;
  date: string;
  location: string;
  capacity: number;
  registeredCount: number;
  feeTomans: number;
  description: string;
  prerequisites: string;
  isRegistered?: boolean;
}

// Official News
export interface NewsItem {
  id: string;
  title: string;
  category: 'بخشنامه دولتی' | 'رویداد و همایش' | 'فراخوان فناورانه' | 'گزارش تحلیلی';
  date: string;
  readTime: string;
  summary: string;
  content: string;
  author: string;
}
