"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import debounce from "debounce";

// Import icons
import { 
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

import logo from "/public/logo.svg";
import name from "/public/name.svg";

function Navbar() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  const debouncedSearch = useCallback((query: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("query", query);
    router.replace(`${window.location.pathname}?${params.toString()}`);
  }, [router]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0E1217] border-b border-gray-800 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} height={30} width={30} alt="Logo" />
          <Image src={name} height={40} width={80} alt="Daily.Dev" />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={handleInputChange}
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1A1F26] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-400 bg-[#0E1217] rounded">⌘</kbd>
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-400 bg-[#0E1217] rounded">K</kbd>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1A1F26]">
            <BellIcon className="w-6 h-6" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1A1F26]">
            <Cog6ToothIcon className="w-6 h-6" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            Level Up
          </button>

          <button className="flex items-center gap-2 p-1 text-gray-400 hover:text-white rounded-full hover:bg-[#1A1F26]">
            <UserCircleIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
