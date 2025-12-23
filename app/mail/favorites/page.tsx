'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import MailLayout from '@/components/MailLayout';
import MailCard from '@/components/MailCard';
import { mailSites } from '@/lib/mailData';
import { useFavorites } from '@/lib/useFavorites';

const ICON_PATHS = {
  alert: <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
};

const Icon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name as keyof typeof ICON_PATHS]}</svg>
);

const haptic = (duration: number = 15) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(duration);
  }
};

export default function FavoritesPage() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const favoriteSites = useMemo(() => {
    return mailSites.filter(site => favorites.includes(site.id));
  }, [favorites]);

  const handleRemoveRequest = (id: string) => {
    haptic(30);
    setConfirmDeleteId(id);
  };

  const handleConfirmRemove = () => {
    if (confirmDeleteId) {
      haptic(50);
      removeFavorite(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const handleCancelRemove = () => {
    haptic(20);
    setConfirmDeleteId(null);
  };

  if (!isLoaded) {
    return (
      <MailLayout>
        <div className="flex flex-col items-center justify-center min-h-screen py-32 space-y-4">
          <div className="w-8 h-8 border-[3px] border-white/20 border-t-[#007AFF] rounded-full animate-spin drop-shadow-lg" />
          <p className="text-white/60 text-sm">加载中...</p>
        </div>
      </MailLayout>
    );
  }

  return (
    <MailLayout>
      <div className="max-w-[420px] mx-auto px-5 pt-24 pb-10 space-y-6">

        {/* 标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-[28px] font-bold text-white tracking-tight drop-shadow-lg">
            我的收藏
          </h1>
          <p className="text-[14px] text-white/70 drop-shadow-md">
            {favoriteSites.length > 0
              ? `共收藏 ${favoriteSites.length} 个邮箱服务`
              : '还没有收藏任何邮箱服务'}
          </p>
        </div>

        {/* 收藏列表 */}
        {favoriteSites.length > 0 ? (
          <div className="space-y-4">
            {favoriteSites.map((site) => (
              <MailCard
                key={site.id}
                site={site}
                isFavorite={true}
                onToggleFavorite={() => handleRemoveRequest(site.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <svg className="w-10 h-10 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-white/60 text-[15px] drop-shadow-sm">
                还没有收藏任何邮箱服务
              </p>
              <p className="text-white/50 text-[13px] drop-shadow-sm">
                在邮箱大全中点击星标即可收藏
              </p>
            </div>
            <Link
              href="/mail"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#007AFF] to-[#0055b3] rounded-[14px] text-white font-semibold text-[15px] shadow-lg active:scale-[0.97] transition-all touch-manipulation border border-white/10"
            >
              浏览邮箱大全
            </Link>
          </div>
        )}

        {/* 提示信息 */}
        {favoriteSites.length > 0 && (
          <div className="text-center space-y-2 pt-4">
            <p className="text-[12px] text-white/50 drop-shadow-sm">
              点击星标可取消收藏
            </p>
          </div>
        )}
      </div>

      {/* 删除确认弹窗 */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity duration-300 backdrop-blur-sm"
            onClick={handleCancelRemove}
          />

          <div
            className="relative w-full max-w-[320px] bg-black/40 backdrop-blur-xl border border-white/20 rounded-[20px] overflow-hidden shadow-2xl"
            style={{
              animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform'
            }}
          >
            <div className="p-6 space-y-4">
              {/* 图标 */}
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-[#FF3B30]/20 flex items-center justify-center">
                  <Icon name="alert" className="w-7 h-7 text-[#FF3B30]" />
                </div>
              </div>

              {/* 标题和描述 */}
              <div className="text-center space-y-2">
                <h3 className="text-[18px] font-bold text-white tracking-tight drop-shadow-md">
                  取消收藏
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed drop-shadow-sm">
                  确定要取消收藏这个邮箱服务吗？
                </p>
              </div>

              {/* 按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelRemove}
                  className="flex-1 py-3 bg-white/10 rounded-[14px] text-white font-semibold text-[15px] active:scale-[0.97] transition-all touch-manipulation border border-white/10"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmRemove}
                  className="flex-1 py-3 bg-[#FF3B30] rounded-[14px] text-white font-semibold text-[15px] shadow-lg active:scale-[0.97] transition-all touch-manipulation"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </MailLayout>
  );
}
