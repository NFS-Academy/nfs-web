export const metadata = {
  title: 'NFS Science Lab',
  description: 'An architectural approach to physics and chemistry education.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
