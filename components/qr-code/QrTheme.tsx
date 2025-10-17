"use client";

import { Palette } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { HexColorPicker } from "react-colorful";
import { Fragment } from "react";

type QrColorProps = {
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
};
type ColorFieldType = {
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

function ColorField({ setBackgroundColor, value }: ColorFieldType) {
  return (
    <div className="flex flex-col gap-1 relative">
    
      <Menu as="div" className="relative inline-block text-left w-full">
        <div className="flex items-center gap-3">
          <Menu.Button
            type="button"
            className="border border-gray-200 p-1 h-10 w-14 rounded-md focus:outline-none cursor-pointer"
            style={{ backgroundColor: value }}
          />
          <input
            name={"bg-color"}
            value={value ?? ""}
            onChange={(e) => setBackgroundColor(e.target.value)}
            placeholder={"Color de fondo"}
             className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
          />
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 bottom-full mb-2 w-56 origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-3">
            <HexColorPicker
              color={value ?? ""}
              onChange={(newColor) => setBackgroundColor(newColor)}
            />
            <p className="text-center text-xs text-gray-500 mt-2">{value}</p>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
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
                <ColorField
                  setBackgroundColor={setBackgroundColor}
                  value={backgroundColor}
                />
               
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
