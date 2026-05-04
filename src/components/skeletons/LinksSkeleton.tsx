import React from "react";
import { Skeleton } from "../ui/Skeleton";

/** Skeleton placeholder for the Links page */
export default function LinksSkeleton() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-28 rounded-lg" />
          <Skeleton className="h-4 w-72 mt-2 rounded" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      {/* Toolbar */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <Skeleton className="flex-1 h-11 rounded-lg" />
        <div className="flex gap-3">
          <Skeleton className="h-11 w-32 rounded-lg" />
          <Skeleton className="h-11 w-32 rounded-lg" />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-900/30 border-b border-gray-800/60 hidden sm:flex gap-6">
          {["w-1/4", "w-1/3", "w-16", "w-16", "w-16"].map((w, i) => (
            <Skeleton key={i} className={`h-4 ${w} rounded`} />
          ))}
        </div>
        {/* Rows */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="px-6 py-4 border-b border-gray-800/60 last:border-b-0"
          >
            {/* Desktop row */}
            <div className="hidden sm:flex items-center gap-6">
              <div className="w-1/4 flex items-center gap-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-4 rounded" />
              </div>
              <div className="w-1/3">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-3 w-24 rounded mt-1.5" />
              </div>
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-6 rounded ml-auto" />
            </div>
            {/* Mobile row */}
            <div className="sm:hidden space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-4 w-4 rounded" />
              </div>
              <Skeleton className="h-3 w-full rounded" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-800/60 flex items-center justify-between">
          <Skeleton className="h-4 w-52 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
