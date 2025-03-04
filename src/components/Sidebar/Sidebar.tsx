"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Import icons
import { 
  HomeIcon, 
  UsersIcon, 
  GlobeAltIcon,
  ClockIcon,
  BookmarkIcon,
  HashtagIcon,
  LinkIcon,
  TrophyIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => (
  <Link 
    href={href}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm
      ${isActive 
        ? 'bg-[#1A1F26] text-white' 
        : 'text-gray-400 hover:bg-[#1A1F26] hover:text-white'
      }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 h-screen fixed left-0 top-16 bg-[#0E1217] border-r border-gray-800 overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="p-3">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors">
          <PlusIcon className="w-4 h-4" />
          <span className="font-medium text-sm">New post</span>
        </button>
      </div>

      <nav className="space-y-4 p-2">
        {/* Main Navigation */}
        <div className="space-y-1">
          <NavItem 
            href="/"
            icon={<HomeIcon className="w-4 h-4" />}
            label="My feed"
            isActive={pathname === '/'}
          />
          <NavItem 
            href="/following"
            icon={<UsersIcon className="w-4 h-4" />}
            label="Following"
          />
          <NavItem 
            href="/explore"
            icon={<GlobeAltIcon className="w-4 h-4" />}
            label="Explore"
          />
          <NavItem 
            href="/history"
            icon={<ClockIcon className="w-4 h-4" />}
            label="History"
          />
        </div>

        {/* Custom Feeds */}
        <div>
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-400">Custom feeds</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Network */}
        <div>
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-400">Network</span>
          </div>
          <div className="space-y-1">
            <NavItem 
              href="/squads"
              icon={<UsersIcon className="w-4 h-4" />}
              label="Find Squads"
            />
          </div>
        </div>

        {/* Bookmarks */}
        <div>
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-400">Bookmarks</span>
          </div>
          <div className="space-y-1">
            <NavItem 
              href="/bookmarks"
              icon={<BookmarkIcon className="w-4 h-4" />}
              label="Quick saves"
            />
          </div>
        </div>

        {/* Discover */}
        <div>
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-400">Discover</span>
          </div>
          <div className="space-y-1">
            <NavItem 
              href="/tags"
              icon={<HashtagIcon className="w-4 h-4" />}
              label="Tags"
            />
            <NavItem 
              href="/sources" 
              icon={<LinkIcon className="w-4 h-4" />}
              label="Sources"
            />
            <NavItem 
              href="/leaderboard"
              icon={<TrophyIcon className="w-4 h-4" />}
              label="Leaderboard"
            />
            <NavItem 
              href="/discussions"
              icon={<ChatBubbleLeftIcon className="w-4 h-4" />}
              label="Discussions"
            />
          </div>
        </div>
      </nav>
    </aside>
  );
} 