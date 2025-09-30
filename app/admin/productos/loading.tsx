import React from "react";

export default function Loading() {
  return (
    <div className="flex-1 rounded-tl-3xl shadow-md  flex h-screen  flex-col overflow-hidden bg-surface-base-secundary">
      <div className="w-full h-46 bg-slate-200"></div>
      <div className="space-y-4 p-6">
        <div className="bg-slate-200 w-full h-20 rounded-xl"></div>
        <div className="bg-slate-200 w-full h-20 rounded-xl"></div>
        <div className="bg-slate-200 w-full h-20 rounded-xl"></div>
        <div className="bg-slate-200 w-full h-20 rounded-xl"></div>
        <div className="bg-slate-200 w-full h-20 rounded-xl"></div>
      </div>
    </div>
  );
}
