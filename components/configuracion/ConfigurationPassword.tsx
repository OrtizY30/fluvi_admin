"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import React, { useState } from "react";

export default function ConfigurationPassword() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  return (
    <div className="shadow-md rounded-md p-6 border border-gray-100 max-w-2xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-brand-primary" />
          <h1 className="text-xl font-semibold">Cambiar Contraseña</h1>
        </div>
        <p className="text-xs text-gray-600">
          Actualiza tu contraseña para mantener tu cuenta segura
        </p>
      </div>
      <form className="space-y-4 mt-4">
        <div>
          <label htmlFor="currentPassword" className="label-input">
            Contraseña Actual
          </label>
          <div className="mt-2 relative">
            <input
              id="currentPassword"
              type={showPasswords.current ? "text" : "password"}
              className="input"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() =>
                setShowPasswords({
                  ...showPasswords,
                  current: !showPasswords.current,
                })
              }
            >
              {showPasswords.current ? (
                <EyeOff className="size-5 text-gray-600" />
              ) : (
                <Eye className="size-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className="label-input">
            Nueva Contraseña
          </label>
          <div className="mt-2 relative">
            <input
              name=""
              id="newPassword"
              type={showPasswords.new ? "text" : "password"}
              className="input"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() =>
                setShowPasswords({ ...showPasswords, new: !showPasswords.new })
              }
            >
              {showPasswords.new ? (
                 <EyeOff className="size-5 text-gray-600" />
              ) : (
                <Eye className="size-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="label-input">
            Confirmar Nueva Contraseña
          </label>
          <div className="mt-2 relative">
            <input
              id="confirmPassword"
              type={showPasswords.confirm ? "text" : "password"}
              className="input"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() =>
                setShowPasswords({
                  ...showPasswords,
                  confirm: !showPasswords.confirm,
                })
              }
            >
              {showPasswords.confirm ? (
                 <EyeOff className="size-5 text-gray-600" />
              ) : (
                <Eye className="size-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-primary p-2 rounded-md hover:bg-red-700 text-white"
        >
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
}
