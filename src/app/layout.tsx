import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lizard Platform",
  icons: {
    icon: "/favicon.svg",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='light'>
      <body>
        {children}
      </body>
    </html>
  );
}
