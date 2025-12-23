'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MailLayoutProps {
  children: ReactNode;
}

const ICON_PATHS = {
  menu: <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>,
  home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
  mail: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>,
  star: <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>,
  chevronRight: <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
};

const Icon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name as keyof typeof ICON_PATHS]}</svg>
);

const haptic = (duration: number = 15) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(duration);
  }
};

export default function MailLayout({ children }: MailLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    haptic(20);
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: '/', label: '首页', icon: 'home' },
    { href: '/mail', label: '邮箱大全', icon: 'mail' },
    { href: '/mail/favorites', label: '我的收藏', icon: 'star' }
  ];

  return (
    <div className="min-h-screen relative font-sans text-white overflow-x-hidden">

      {/* 背景层 */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <img
          src="https://loliapi.com/acg/"
          alt="background"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          onLoad={() => setBgLoaded(true)}
        />
      </div>

      {/* 头部 */}
      <header className="fixed top-0 left-0 right-0 h-[52px] z-40 flex items-center justify-between px-4 pt-2">
        <Link
          href="/"
          className="text-[17px] font-semibold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] cursor-pointer select-none transition-all duration-300 active:scale-95 touch-manipulation"
        >
          脸书小助手
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-black/40 border border-white/20 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] shadow-[0_0_6px_rgba(52,199,89,1)] animate-pulse" />
            <span className="text-[11px] font-semibold text-white/95 font-mono tracking-tight drop-shadow-md">
              在线
            </span>
          </div>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-full bg-black/40 border border-white/20 shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
          >
            <Icon name={isMenuOpen ? "close" : "menu"} className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* 右侧菜单 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity duration-300 backdrop-blur-sm"
            onClick={toggleMenu}
          />

          <div
            className="relative w-[280px] h-full bg-black/40 backdrop-blur-xl border-l border-white/20 shadow-2xl overflow-y-auto"
            style={{
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }}
          >
            <div className="p-6 space-y-2">
              <h2 className="text-[20px] font-bold text-white mb-6 tracking-tight drop-shadow-md">
                导航菜单
              </h2>

              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMenu}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] touch-manipulation border ${
                      isActive
                        ? 'bg-white/10 border-white/10 shadow-lg text-[#409CFF] font-semibold'
                        : 'bg-transparent border-transparent text-white/80 active:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#007AFF]/20' : 'bg-white/10'}`}>
                        <Icon name={item.icon} className={`w-4 h-4 ${isActive ? 'text-[#409CFF]' : 'text-white/50'}`} />
                      </div>
                      <span className="text-[16px] tracking-tight text-left drop-shadow-sm">{item.label}</span>
                    </div>
                    {isActive && <Icon name="chevronRight" className="w-5 h-5 text-[#409CFF]" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 主内容 */}
      <main className="relative z-10">
        {children}
      </main>

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
