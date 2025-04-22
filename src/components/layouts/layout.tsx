import { ReactNode } from 'react';
import { cn, NextUIProvider } from '@nextui-org/react';
import Header from './header';
import Footer from './footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <NextUIProvider>
      <div className="min-h-screen w-full flex">
        <div className="w-[312px] border-r p-4 pt-8">
          <Sidebar />
        </div>
        <main className={cn("w-full flex-1")}>
          <Header />
          {children}
          <Footer />
        </main>
      </div>
    </NextUIProvider>
  );
}