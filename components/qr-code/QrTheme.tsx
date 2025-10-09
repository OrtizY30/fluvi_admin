"use client";

import { Palette } from "lucide-react";

type QrColorProps = {
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
};
export default function QrTheme({
  setBackgroundColor,
  backgroundColor,
}: QrColorProps) {
  return (
    <div className="space-y-6">
      <div className=" p-6 rounded-md shadow-md border border-gray-100 ">
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <Palette className="size-6" strokeWidth={1.5} />
            Color del Qr
          </div>
          <p className="text-sm text-gray-500">
            Personaliza el color de fondo de tu Qr
          </p>
        </div>

        <div>
          <form className="space-y-4">
            {/* Color Secundario */}
            <div className="space-y-2">
              <label className="label-input" htmlFor="bg-color">
                Color de Fondo
              </label>
              <div className="flex items-center gap-3">
                <input
                  placeholder="Color de fondo"
                  name="bg-color"
                  value={backgroundColor}
                  type="color"
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className=" h-10 w-20 rounded-md focus:outline-none border p-2 border-gray-300 cursor-pointer"
                />
                <input
                  value={backgroundColor}
                  name="bg-color"
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  placeholder="#0ea5e9"
                  className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
