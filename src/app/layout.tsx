import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HappyLand Pickleball",
  description: "Hệ thống sân chơi Pickleball hàng đầu tại Việt Nam",
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
