import React from "react";
import { Skeleton } from "../ui/Skeleton";

/** Skeleton placeholder for the Analysis page */
export default function AnalysisSkeleton() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-28 rounded-lg" />
          <Skeleton className="h-4 w-72 mt-2 rounded" />
        </div>
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-[#111216] border border-gray-800/60 rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-5 w-14 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6">
        <Skeleton className="h-5 w-40 rounded mb-2" />
        <Skeleton className="h-4 w-56 rounded mb-6" />
        <Skeleton className="h-80 w-full rounded-lg" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referrers */}
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6">
          <Skeleton className="h-5 w-28 rounded mb-2" />
          <Skeleton className="h-4 w-48 rounded mb-6" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 flex-1 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6">
          <Skeleton className="h-5 w-20 rounded mb-2" />
          <Skeleton className="h-4 w-40 rounded mb-6" />
          <div className="flex items-center justify-center py-6">
            <Skeleton className="h-40 w-40 rounded-full" />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Skeleton className="h-3 w-3 rounded-sm" />
                <Skeleton className="h-3 w-14 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6">
          <Skeleton className="h-5 w-24 rounded mb-2" />
          <Skeleton className="h-4 w-36 rounded mb-6" />
          <div className="space-y-5">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-7 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                  <Skeleton className="h-4 w-8 rounded" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            ))}
          </div>
          <Skeleton className="h-9 w-full rounded-lg mt-6" />
        </div>
      </div>
    </div>
  );
}
