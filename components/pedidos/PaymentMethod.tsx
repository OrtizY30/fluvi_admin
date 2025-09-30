"use client";

import { Methods } from "@/src/schemas";
import BtnToogleActiveMethod from "./BtnToogleActiveMethod";
import BtnDeleteMethod from "./BtnDeleteMethod";
import ModalMethodForm from "./ModalMethodForm";

export default function PaymentMethod({ methods }: { methods: Methods[] }) {


  return (
    <div className="w-full p-8 s bg-white mx-auto space-y-3 border rounded-xl border-gray-200  shadow-md">
      <div className="flex flex-col text-gray-800">
        <h1 className="font-black text-xl">Metodos de Pago</h1>
        <p className="text-xs text-gray-500">
          Selecciona los metodos de pagos que aceptes en tus pedidos{" "}
        </p>
      </div>

      <form className="space-y-6 w-full">
        {methods.length ? (
          methods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between gap-4"
            >
              <BtnToogleActiveMethod method={method} />
              <BtnDeleteMethod methodId={method.id} />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 font-bold">
            No tienes métodos de pagos disponibles
          </p>
        )}

        <ModalMethodForm />
      </form>
    </div>
  );
}
