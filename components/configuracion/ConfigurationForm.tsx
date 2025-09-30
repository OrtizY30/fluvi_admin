import {
  Building,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ConfigurationForm() {
  const countries = [
    { value: "colombia", label: "Colombia", flag: "🇨🇴" },
    { value: "mexico", label: "México", flag: "🇲🇽" },
    { value: "argentina", label: "Argentina", flag: "🇦🇷" },
    { value: "chile", label: "Chile", flag: "🇨🇱" },
    { value: "peru", label: "Perú", flag: "🇵🇪" },
    { value: "ecuador", label: "Ecuador", flag: "🇪🇨" },
  ];

  const businessTypes = [
    { value: "restaurant", label: "Restaurante" },
    { value: "cafe", label: "Cafetería" },
    { value: "bar", label: "Bar" },
    { value: "bakery", label: "Panadería" },
    { value: "fastfood", label: "Comida Rápida" },
    { value: "other", label: "Otro" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Información Básica */}
      <div className="lg:col-span-2 rounded-md p-6 shadow-md border border-gray-100">
        <div className="">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
            <h1 className="text-xl font-semibold">Información del Negocio</h1>
          </div>
          <p className="text-xs text-gray-600">Actualiza la información básica de tu cuenta y negocio</p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
  Los cambios realizados en esta sección pueden tardar hasta <span className="font-semibold">24 horas</span> en reflejarse en tu app menú. 
  Si tienes alguna duda o necesitas asistencia, por favor comunícate con el equipo de soporte de <span className="text-brand-primary font-bold">Fluvi</span>.
</div>
        </div>
        <form className="space-y-6 mt-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="label-input">
                Nombre del Negocio
              </label>
              <input
                name="name"
                id="name"
                placeholder="Nombre del negocio"
                className="input"
              />
              <p className="text-xs text-gray-500 mt-1">
                Este será tu nombre de dominio
              </p>
            </div>

            <div>
              <label htmlFor="domain" className="label-input">
                Dominio
              </label>
              <div className=" flex items-center mt-1">
                
                <div className=" flex items-center  text-sm border border-slate-300  p-2 w-full border-r-0 rounded-l-md">freshcoffee</div>

                <div className=" flex items-center border-slate-300 py-2 px-3  bg-gray-100 border border-l-0 rounded-r-md text-sm text-gray-800 font-bold">
                  .fluvi.net
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="label-input">
                Email
              </label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input placeholder="micorreo@gmail.com" name="email" id="email" type="email" className="input" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="label-input">
                Teléfono
              </label>
              <div className="mt-2 relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input placeholder="321 12345678" name="phone" id="phone" className="input" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="businessType" className="label-input">
                Tipo de Negocio
              </label>
              <select
                name="businessType"
                title="Tipo de negocio"
                className="w-full border mt-2 border-gray-300 p-2 rounded-lg"
              >
                {businessTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="label-input">
                País
              </label>
              <select
                name="country"
                title="País"
                className="w-full mt-2 border border-gray-300 p-2 rounded-lg"
              >
                {countries.map((country) => (
                  <option  key={country.value} value={country.value}>
                    {country.flag} - {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn w-full">
            Actualizar Cambios
          </button>
        </form>
      </div>

      {/* Panel de Estado */}
      <div className="lg:col-span-1 space-y-6 p-6 shadow-md rounded-md border border-gray-100 h-72">
        <h1 className="text-lg font-semibold">Estado de la Cuenta</h1>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Plan Actual</span>
            <div className="bg-blue-600 text-white text-sm font-semibold  py-1 px-3 rounded-full">Gratuito</div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estado</span>
            <div className="bg-green-100 text-green-600 text-sm font-semibold py-1 px-3 rounded-full">Activa</div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Verificación</span>
            <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold py-1 px-3 rounded-full">Pendiente</div>
          </div>

        <button
         className="w-full p-2 mt-2 bg-blue-600 text-white rounded-md shadow-md text-sm"
        >


            <Link
            href={'/admin/configuracion/suscripcion'}
           >
              Verificar Cuenta
            </Link>
                </button>
          
        </div>

        {/* <div>
          <div>
            <p className="text-lg">Información Adicional</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Creada: 15 Ene 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Última actualización: Hoy</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-4 w-4" />
              <span>Zona horaria: GMT-5</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
