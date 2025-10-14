"use client";

import Image from "next/image";
import Select from "react-select";

type Props = {
  defaultValue?: string;
  name?: string;
};
export const countries = [
  { value: "argentina", label: "Argentina", code: "ar" },
  { value: "bolivia", label: "Bolivia", code: "bo" },
  { value: "brasil", label: "Brasil", code: "br" },
  { value: "chile", label: "Chile", code: "cl" },
  { value: "colombia", label: "Colombia", code: "co" },
  { value: "costa rica", label: "Costa Rica", code: "cr" },
  { value: "cuba", label: "Cuba", code: "cu" },
  { value: "ecuador", label: "Ecuador", code: "ec" },
  { value: "el salvador", label: "El Salvador", code: "sv" },
  { value: "españa", label: "España", code: "es" },
  { value: "guatemala", label: "Guatemala", code: "gt" },
  { value: "honduras", label: "Honduras", code: "hn" },
  { value: "méxico", label: "México", code: "mx" },
  { value: "nicaragua", label: "Nicaragua", code: "ni" },
  { value: "panamá", label: "Panamá", code: "pa" },
  { value: "paraguay", label: "Paraguay", code: "py" },
  { value: "perú", label: "Perú", code: "pe" },
  { value: "puerto rico", label: "Puerto Rico", code: "pr" },
  { value: "república dominicana", label: "República Dominicana", code: "do" },
  { value: "uruguay", label: "Uruguay", code: "uy" },
  { value: "venezuela", label: "Venezuela", code: "ve" },
];

export default function CountrySelect({
  defaultValue,
  name = "country",
}: Props) {
  const options = countries.map((c) => ({
    ...c,
    flag: `https://flagcdn.com/${c.code}.svg`,
  }));

  const defaultOption = options.find((o) => o.value === defaultValue);

  return (
    <div>
      <label className="font-bold rounded-3xl text-sm sm:text-base " htmlFor={name}>
        País
      </label>
      <Select
        isSearchable={false}
        inputId={name}
        name={name}
        placeholder="Selecciona un país"
        menuPlacement="top"
        menuPosition="fixed"
        defaultValue={defaultOption}
        options={options}
        required
        className={
          "w-full  bg-white rounded-3xl text-[16px]"
        }
        getOptionValue={(option) => option.value} // opcional
        formatOptionLabel={(option) => (
          <div className="flex rounded-3xl  items-center gap-2 relative">
            <div className="relative h-3 size-5">
              <Image
                src={option.flag}
                alt={option.label}
                fill
                objectFit="cover"
              />
            </div>
            <span>{option.label}</span>
          </div>
        )}

        styles={{
    control: (base, state) => ({
      ...base,
      borderRadius: '1.5rem', // equivale a rounded-3xl
      borderColor: state.isFocused ? '#d1d5dc' : '#d1d5dc',
      padding: 7
      
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '1.5rem', // bordes redondeados también en el menú
      overflow: 'hidden',
    }),
  }}
      />
    </div>
  );
}
