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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </NextUIProvider>
  );
} 