import type {Metadata} from 'next';
import { Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'আর্কিমিডিসের সূত্রের সাহায্যে নকল সোনার মুকুট শনাক্তকরণ পরীক্ষা',
  description: 'Class 9-10 Physics Virtual Laboratory',
  openGraph: {
    title: 'আর্কিমিডিসের সূত্রের সাহায্যে নকল সোনার মুকুট শনাক্তকরণ পরীক্ষা',
    description: 'Class 9-10 Physics Virtual Laboratory',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${notoSerifBengali.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
