"use client";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CheckCircle, CloseOutlined } from "@mui/icons-material";
import React, { useActionState, useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { Horary } from "@/src/schemas";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { updateHorary } from "@/actions/horary/update-horary-action";

type HoraryFormProps = {
  horary: Horary;
};
export default function HoraryForm({ horary }: HoraryFormProps) {
 
  
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const updateHoraryWithId = updateHorary.bind(null, horary.id);
  const [state, dispatch] = useActionState(updateHoraryWithId, {
    errors: [],
    success: "",
    data: {
      day: "",
      openTime: "",
      closeTime: "",
    },
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />, {});
      setEditingDay(null);
    }
  }, [state]);

  function formatTime(time: string) {
    if (!time) return "";
    const date = parse(time, "HH:mm", new Date());
    return format(date, "hh : mm a"); // ej: 10 : 00 am
  }

  return (
    <>
      <div
        key={horary.id}
        className="py-3 px-1 rounded-xl hover:bg-gray-50 transition-colors box-content"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
          
            <div className="w-20">
              <h3 className="text-xs font-bold text-gray-800">
                {horary.day}
              </h3>
            </div>
        

          {editingDay === horary.day ||
          (horary.openTime !== "00:00" && horary.closeTime !== "00:00") ? (
            <div className="flex items-center gap-4">
              {editingDay === horary.day ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <form
                    action={dispatch}
                    id={`horary-form-${horary.day}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      name="day"
                      type="hidden"
                      defaultValue={horary.day || ""}
                    />

                    <input
                      placeholder="00:00"
                      name="openTime"
                      type="time"
                      defaultValue={horary.openTime || "00:00"}
                      className=" text-sm border outline-none p-1 border-slate-300 rounded-md"
                    />

                    <span className="text-gray-500">-</span>
                    <input
                      placeholder="00:00"
                      name="closeTime"
                      type="time"
                      defaultValue={horary.closeTime || "00:00"}
                      className=" text-sm border outline-none p-1 border-slate-300 rounded-md"
                    />
                  </form>

                  <div className="flex items-center gap-1">
                    <button
                      type="submit"
                      form={`horary-form-${horary.day}`}
                      title="Guardar"
                      className="bg-green-600 cursor-pointer rounded-md hover:bg-green-700 text-white h-8 px-3"
                    >
                      <CheckCircle fontSize="small" />
                    </button>
                    <button
                      title="Cancelar"
                      onClick={() => setEditingDay(null)}
                      className="h-8 cursor-pointer px-3 rounded-md border border-slate-200"
                    >
                      <CloseOutlined
                        fontSize="small"
                        className=" text-gray-400"
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-1">
                  <div className="text-sm text-gray-700 min-w-0">
                    {formatTime(horary.openTime)} -{" "}
                    {formatTime(horary.closeTime)}
                  </div>
                  <button
                    title="Editar"
                    onClick={() => setEditingDay(horary.day)}
                    className=" cursor-pointer p-2 rounded-lg text-slate-500 hover:bg-gray-300 hover:text-gray-700 transition-colors"
                  >
                    <PencilSquareIcon className="size-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Cerrado todo el día</span>
              <button
                title="Editar"
                onClick={() => setEditingDay(horary.day)}
                className=" cursor-pointer p-2 rounded-lg text-slate-500 hover:bg-gray-300 hover:text-gray-700 transition-colors"
              >
                <PencilSquareIcon className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
