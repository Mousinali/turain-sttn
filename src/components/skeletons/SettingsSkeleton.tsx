import React from "react";
import { Skeleton, SkeletonCircle } from "../ui/Skeleton";

/** Skeleton placeholder for the Settings page */
export default function SettingsSkeleton() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <Skeleton className="h-7 w-24 rounded-lg" />
        <Skeleton className="h-4 w-80 mt-2 rounded" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className={`h-10 rounded-lg ${i === 0 ? "w-full" : "w-full"}`}
              />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 sm:p-8">
            <Skeleton className="h-5 w-36 rounded mb-6" />

            {/* Avatar row */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800/60">
              <SkeletonCircle size={80} />
              <div>
                <Skeleton className="h-9 w-32 rounded-lg mb-2" />
                <Skeleton className="h-3 w-48 rounded" />
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-5 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-11 w-full rounded-lg" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-3 w-80 rounded mt-1" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="pt-4 flex justify-end">
                <Skeleton className="h-10 w-32 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
