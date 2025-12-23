'use client';

import { useState, useMemo } from 'react';
import MailLayout from '@/components/MailLayout';
import MailCard from '@/components/MailCard';
import { mailSites, categories } from '@/lib/mailData';
import { useFavorites } from '@/lib/useFavorites';

const ICON_PATHS = {
  search: <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
};

const Icon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">{ICON_PATHS[name as keyof typeof ICON_PATHS]}</svg>
);

export default function MailPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { favorites, addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();

  const filteredSites = useMemo(() => {
    let filtered = mailSites;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(site => site.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        site =>
          site.name.toLowerCase().includes(query) ||
          site.description.toLowerCase().includes(query) ||
          site.url.toLowerCase().includes(query) ||
          site.features.some(f => f.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleToggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
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
            临时邮箱大全
          </h1>
          <p className="text-[14px] text-white/70 drop-shadow-md">
            收录 {mailSites.length} 个优质临时邮箱服务
          </p>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon name="search" className="w-4 h-4 text-white/40" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索邮箱服务..."
            className="w-full pl-11 pr-10 py-3 bg-black/30 border border-white/20 rounded-[16px] text-[16px] text-white placeholder-white/40 focus:ring-2 focus:ring-white/30 focus:bg-black/40 transition-colors caret-[#007AFF] outline-none shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center touch-manipulation active:scale-90 transition-transform"
            >
              <div className="bg-white/20 rounded-full p-0.5">
                <Icon name="close" className="w-3 h-3 text-white" />
              </div>
            </button>
          )}
        </div>

        {/* 分类筛选 */}
        <div className="overflow-x-auto -mx-5 px-5 pb-2">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all active:scale-95 touch-manipulation whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white/20 text-white border border-white/30 shadow-lg'
                  : 'bg-black/30 text-white/70 border border-white/10 active:bg-black/40'
              }`}
            >
              全部
            </button>
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all active:scale-95 touch-manipulation whitespace-nowrap ${
                  selectedCategory === key
                    ? 'bg-white/20 text-white border border-white/30 shadow-lg'
                    : 'bg-black/30 text-white/70 border border-white/10 active:bg-black/40'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[13px] text-white/60 drop-shadow-sm">
            找到 {filteredSites.length} 个邮箱服务
          </p>
          <p className="text-[13px] text-white/60 drop-shadow-sm">
            已收藏 {favorites.length} 个
          </p>
        </div>

        {/* 邮箱列表 */}
        <div className="space-y-4">
          {filteredSites.length > 0 ? (
            filteredSites.map((site) => (
              <MailCard
                key={site.id}
                site={site}
                isFavorite={isFavorite(site.id)}
                onToggleFavorite={() => handleToggleFavorite(site.id)}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60 text-[15px] drop-shadow-sm">
                未找到匹配的邮箱服务
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-6 py-2 bg-white/10 text-white/80 rounded-full text-[14px] font-medium active:scale-95 transition-all touch-manipulation border border-white/10"
              >
                清除筛选
              </button>
            </div>
          )}
        </div>

        {/* 提示 */}
        <div className="text-center space-y-2 pt-4">
          <p className="text-[12px] text-white/50 drop-shadow-sm">
            使用临时邮箱注册网站，保护隐私安全
          </p>
        </div>
      </div>
    </MailLayout>
  );
}
