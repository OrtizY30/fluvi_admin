import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";

type EditButtonProps<T> = {
  item: T;
  onEdit: (item: T) => void;
};
export default function EditButton<T>({ item, onEdit }: EditButtonProps<T>) {
  return (
    <button
     onClick={() => onEdit(item)}
      type="button"
      title="Editar"
      className="p-1.5 cursor-pointer text-slate-500 hover:text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
    >
      <PencilSquareIcon className="size-5" />
    </button>
  );
}
