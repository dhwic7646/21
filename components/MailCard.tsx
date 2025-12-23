'use client';

import { useState, memo } from 'react';
import { MailSite } from '@/lib/mailData';

interface MailCardProps {
  site: MailSite;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ICON_PATHS = {
  star: <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>,
  starOutline: <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>,
  link: <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>,
  check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
};

const Icon = memo(({ name, className = "w-5 h-5" }: { name: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name as keyof typeof ICON_PATHS]}</svg>
));
Icon.displayName = 'Icon';

const haptic = (duration: number = 15) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(duration);
  }
};

export default memo(function MailCard({ site, isFavorite, onToggleFavorite }: MailCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    haptic(30);
    try {
      await navigator.clipboard.writeText(site.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleFavorite = () => {
    haptic(30);
    onToggleFavorite();
  };

  const handleVisit = () => {
    haptic(20);
    window.open(site.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-black/30 rounded-[20px] border border-white/20 shadow-xl overflow-hidden backdrop-blur-sm">
      <div className="p-5 space-y-4">
        {/* 头部 */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[18px] font-bold text-white truncate tracking-tight drop-shadow-md">
              {site.name}
            </h3>
            <p className="text-[13px] text-white/60 mt-1 line-clamp-2 drop-shadow-sm">
              {site.description}
            </p>
          </div>

          <button
            onClick={handleFavorite}
            className={`shrink-0 p-2 rounded-full transition-all duration-200 active:scale-95 touch-manipulation ${
              isFavorite
                ? 'bg-[#FFD700]/20 text-[#FFD700]'
                : 'bg-white/10 text-white/60 active:bg-white/20'
            }`}
          >
            <Icon name={isFavorite ? "star" : "starOutline"} className="w-5 h-5" />
          </button>
        </div>

        {/* 特性标签 */}
        <div className="flex flex-wrap gap-2">
          {site.features.map((feature, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-[12px] font-medium bg-white/10 text-white/80 rounded-full border border-white/10 drop-shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* 网址显示 */}
        <div className="bg-black/40 rounded-xl px-3 py-2.5 border border-white/10">
          <p className="text-[13px] text-white/70 font-mono truncate drop-shadow-sm">
            {site.url}
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={handleVisit}
            className="flex-1 py-3 bg-gradient-to-r from-[#007AFF] to-[#0055b3] rounded-[14px] text-white font-semibold text-[15px] shadow-lg active:scale-[0.97] transition-all touch-manipulation border border-white/10"
          >
            访问网站
          </button>

          <button
            onClick={handleCopy}
            className={`px-4 py-3 rounded-[14px] font-semibold text-[15px] shadow-lg transition-all active:scale-[0.97] touch-manipulation border ${
              copied
                ? 'bg-[#34C759]/30 border-[#34C759]/50 text-[#4ADE80]'
                : 'bg-black/40 border-white/20 text-white/90 active:bg-black/50'
            }`}
          >
            {copied ? (
              <div className="flex items-center gap-1.5">
                <Icon name="check" className="w-4 h-4" />
                <span>已复制</span>
              </div>
            ) : (
              <Icon name="link" className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
