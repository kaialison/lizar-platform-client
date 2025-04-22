import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <NextUIProvider>
      <div className="min-h-screen grid grid-cols-5">
        <div className="col-span-1">
        <Header />
        </div>
        <main className="col-span-4">
          {children}
        </main>
      </div>

    </NextUIProvider>
  );
}