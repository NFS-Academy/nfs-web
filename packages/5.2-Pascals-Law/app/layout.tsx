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
  title: 'প্যাসকেলের সূত্র সিমুলেশন',
  description: 'প্যাসকেলের সূত্র এবং হাইড্রোলিক প্রেসের একটি থ্রিডি ইন্টারেক্টিভ সিমুলেশন।',
  openGraph: {
    title: 'প্যাসকেলের সূত্র সিমুলেশন',
    description: 'প্যাসকেলের সূত্র এবং হাইড্রোলিক প্রেসের একটি থ্রিডি ইন্টারেক্টিভ সিমুলেশন।',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'প্যাসকেলের সূত্র সিমুলেশন',
    description: 'প্যাসকেলের সূত্র এবং হাইড্রোলিক প্রেসের একটি থ্রিডি ইন্টারেক্টিভ সিমুলেশন।',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.variable} ${notoSerifBengali.variable} font-body bg-[#0a0a0c] text-slate-100`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
