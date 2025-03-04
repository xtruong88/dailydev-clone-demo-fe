import Card from "@/components/Card";
import Image from "next/image";
import plus from "/public/plus.svg";
import filter from "/public/filter.svg";
import SkeletonCard from "@/components/Skeleton";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  return (
    <>
      {/* Feed Settings & Shortcuts */}
      <div className="flex justify-between items-center mb-4">
        <button className="flex items-center gap-2 px-3 py-2 bg-[#1A1F26] rounded-lg text-gray-400 hover:text-white">
          <span className="text-sm">Feed Settings</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-[#1A1F26] rounded-lg text-gray-400 hover:text-white">
          <span className="text-sm">Add Shortcuts</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <Suspense fallback={<SkeletonCard />}>
          <Card query={searchParams?.query} />
        </Suspense>
      </div>
    </>
  );
}

function WrapComponent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-gray-700">
        <Navbar />
      </header>
      {children}
    </>
  );
}
