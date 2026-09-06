import type {Metadata} from 'next';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css'; // Global styles

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-serif-bengali',
});

export const metadata: Metadata = {
  title: 'তরলের প্রকৃত ও আপাত প্রসারণ',
  description: 'পদার্থবিজ্ঞান সিমুলেশন • অধ্যায় ৬: তাপীয় প্রসারণ',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${notoSerifBengali.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
