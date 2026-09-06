import type {Metadata} from 'next';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css'; // Global styles

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-bengali',
});

export const metadata: Metadata = {
  title: 'আপেক্ষিক তাপ (Specific Heat)',
  description: 'আপেক্ষিক তাপ সিমুলেশন',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn">
      <body suppressHydrationWarning className={`${hindSiliguri.variable} ${notoSerifBengali.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
