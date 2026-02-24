"use client";

import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { X } from "lucide-react";
import BtnCreateModifierGroup from "./BtnCreateModifierGroup";
import { useModifiersStore } from "@/store/useModifiersStore";
import ModifierGroupsDetails from "./ModifierGroupsDetails";

type ModifiersGroupDrawerProps = {
  open: boolean;
  setOpen: () => void;
};

export default function ModifiersGroupDrawer({
  open,
  setOpen,
}: ModifiersGroupDrawerProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const { modifierGroups, loading } = useModifiersStore();

  const onClose = () => {
    setOpen();
  };

  const toggleModifiersGroups = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="left"
      PaperProps={{
        sx: {
          overflow: "hidden", // para que no sobresalga el contenido
        },
      }}
    >
      <div className="flex md:w-xl w-screen flex-col h-full bg-slate-50">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 shadow-sm">
          <p className="font-bold text-lg">Gestionar Modificadores</p>
          <IconButton component="span" onClick={onClose}>
            <X strokeWidth={1.5} className="text-black size-6" />
          </IconButton>
        </div>

        {/* Contenido s*/}
        <div className="flex-1 overflow-y-auto md:p-4 px-2 py-4">
          <div className="flex justify-between items-center w-full pb-4">
            <div className="flex gap-2">
              <p className="font-semibold">Total de categorías </p>
              <div className=" w-6 h-6 flex justify-center items-center text-sm text-white rounded-md shadow-md font-bold bg-brand-primary">
                {modifierGroups.length}
              </div>
            </div>
            <BtnCreateModifierGroup />
          </div>
          {loading && (
            <div className="space-y-3">
              <p className="text-gray-500">Cargando modificadores...</p>
            </div>
          )}

          <>
            {modifierGroups.length === 0 ? (
              <p className="text-gray-500 p-6 text-center text-lg font-bold">
                No hay modificadores aún.
              </p>
            ) : (
              <div className="space-y-2">
                {modifierGroups.map((modifiersGroups) => (
                  <ModifierGroupsDetails
                    key={modifiersGroups.id}
                    expanded={expanded[modifiersGroups.id]}
                    toggleModifiersGroups={toggleModifiersGroups}
                    modifiersGroups={modifiersGroups}
                  />
                ))}
              </div>
            )}
          </>
        </div>
      </div>
    </Drawer>
  );
}
