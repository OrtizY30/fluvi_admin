import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function Pagination() {
  return (
  
      <div className="bg-white shadow-sm border-t border-slate-200 p-3 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xs text-slate-600">
            Mostrando 1-15 de 24 productos
          </div>
          <div className="flex items-center gap-1">
            <button
              title="Anterior"
              type="button"
              className="h-7 w-7 cursor-pointer"
            >
              <ChevronLeftIcon className="size-4" />
            </button>

            <button
              type="button"
              className="h-7 w-7 cursor-pointer bg-purple-100 text-purple-600 text-xs"
            >
              1
            </button>
            <button type="button" className="h-7 w-7 text-xs cursor-pointer">
              2
            </button>
            <button type="button" className="h-7 w-7 text-xs cursor-pointer">
              3
            </button>
            <div className="h-7 flex justify-center items-center w-7 text-xs">
              ...
            </div>

            <button
              title="Siguiente"
              type="button"
              className="h-7 w-7 cursor-pointer"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
  )
}
