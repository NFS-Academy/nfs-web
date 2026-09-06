import type { Metadata } from 'next';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-noto-serif-bengali',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'টরিসেলির পরীক্ষা ও আবহাওয়া পরিবর্তনের সম্পর্ক | NCTB পদার্থবিজ্ঞান ৯ম-১০ম শ্রেণি',
  description:
    'বাংলাদেশ NCTB ৯ম-১০ম শ্রেণি পদার্থবিজ্ঞান অধ্যায় ৫ (পদার্থের অবস্থা ও চাপ) এর টরিসেলির পারদ ব্যারোমিটার পরীক্ষা ও আবহাওয়া পূর্বাভাস ইন্টারঅ্যাক্টিভ ৩ডি সিমুলেশন।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${notoSerifBengali.variable} h-full dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-slate-950 text-slate-100 antialiased font-serif"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
