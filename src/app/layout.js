import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import "./globals.css";

export const metadata = {
  title: 'NFS Science Lab',
  description: 'An architectural approach to physics and chemistry education.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="snap-y snap-mandatory scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#FDFBF7] dark:bg-black text-slate-900 dark:text-white antialiased transition-colors duration-500 ease-out">
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
