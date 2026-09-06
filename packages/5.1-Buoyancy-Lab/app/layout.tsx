import type {Metadata} from 'next';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-heading',
});

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'বাস্তব জীবনে প্লবতা | Buoyancy Lab',
  description: '৯ম–১০ম শ্রেণির পদার্থবিজ্ঞান | আর্কিমিডিসের নীতি',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${notoSerifBengali.variable}`}>
      <body className="font-body" suppressHydrationWarning>{children}</body>
    </html>
  );
}
