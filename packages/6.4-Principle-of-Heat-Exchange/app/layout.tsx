import type {Metadata} from 'next';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css'; // Global styles

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bangla-heading',
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bangla-body',
});

export const metadata: Metadata = {
  title: 'তাপের আদান-প্রদান নীতি',
  description: 'Heat Exchange Principle Physics Simulation',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.variable} ${notoSerifBengali.variable}`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
