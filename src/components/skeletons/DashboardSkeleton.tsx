import React from "react";
import { Skeleton, SkeletonText } from "../ui/Skeleton";

/** Skeleton placeholder for the Dashboard (Home) page */
export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-pulse-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-36 rounded-lg" />
          <Skeleton className="h-4 w-72 mt-2 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24 rounded-lg hidden sm:block" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-[#111216] border border-gray-800/60 rounded-xl p-5"
          >
            <Skeleton className="h-4 w-24 rounded mb-3" />
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-28 rounded-lg" />
              <Skeleton className="h-5 w-14 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111216] border border-gray-800/60 rounded-xl p-6">
          <Skeleton className="h-5 w-32 rounded mb-2" />
          <Skeleton className="h-4 w-48 rounded mb-6" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6">
          <Skeleton className="h-5 w-28 rounded mb-2" />
          <Skeleton className="h-4 w-40 rounded mb-6" />
          <div className="flex items-center justify-center">
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Create Link Tool */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6">
        <Skeleton className="h-5 w-36 rounded mb-2" />
        <Skeleton className="h-4 w-64 rounded mb-5" />
        <div className="flex flex-col sm:flex-row gap-3 max-w-4xl">
          <Skeleton className="flex-1 h-12 rounded-lg" />
          <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-800/60 flex items-center justify-between">
          <Skeleton className="h-5 w-28 rounded" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
        {/* Header row */}
        <div className="px-6 py-3 bg-gray-900/30 border-b border-gray-800/60 hidden sm:flex gap-6">
          {[120, 200, 60, 60, 60].map((w, i) => (
            <Skeleton key={i} className="h-4 rounded" style={{ width: w }} />
          ))}
        </div>
        {/* Table rows */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="px-6 py-4 border-b border-gray-800/60 last:border-b-0 flex items-center gap-6"
          >
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-4 flex-1 rounded" />
            <Skeleton className="h-4 w-12 rounded hidden sm:block" />
            <Skeleton className="h-6 w-16 rounded-md hidden sm:block" />
            <Skeleton className="h-6 w-6 rounded hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
