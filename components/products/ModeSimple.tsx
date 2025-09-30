import { Product } from "@/src/schemas";
import React, { useEffect, useState } from "react";
import TabVariants from "../variantGroup/TabVariants";
import { InputAdornment, inputBaseClasses, TextField } from "@mui/material";
import { VariantGroupDetails } from "../variantGroup/VariantGroupDetails";
import InputVariantGroup from "../variantGroup/InputVariantGroup";
import BtnCreateVariant from "../variantGroup/variant/BtnCreateVariant";

type ModeSimpleProps = {
  product: Product;
  price: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function ModeSimple({
  product,
  price,
  onChange,
}: ModeSimpleProps) {
  // arranca simple si NO tiene variantes
  const [modeSimple, setModeSimple] = useState(
    !Boolean(product?.variantGroup?.variants?.length)
  );

  // 👇 si el servidor revalida y el product cambia, reflejamos el modo
  useEffect(() => {
    const hasVariants = Boolean(product?.variantGroup?.variants?.length);
    setModeSimple(!hasVariants);
  }, [product?.variantGroup?.variants?.length]);

  return (
    <>
      <TabVariants
        product={product}
        modeSimple={modeSimple}
        setModeSimple={setModeSimple}
      />

      {/* Si es simple → un precio */}
      {modeSimple ? (
        <div>
          <TextField
            type="number"
            className="w-full"
            id="outlined-basic"
            variant="outlined"
            name="price"
            label="Precio"
            value={price}
            onChange={onChange}
            size="small"
             sx={{
                   "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
                }}
            slotProps={{
              
              input: {
                // 👈 aquí lo cambiamos
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      opacity: 0,
                      pointerEvents: "none",
                      [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                        opacity: 1,
                      },
                    }}
                  >
                    <span className=" text-gray-500 text-lg">$</span>
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
      ) : (
        <>
          {product?.variantGroup && (
            <InputVariantGroup variantGroup={product.variantGroup} />
          )}
          <VariantGroupDetails product={product!} />
          {product.variantGroup?.id && <BtnCreateVariant variantGroup={product.variantGroup}/>}
          
        </>
      )}

      {/* Si es variantes → lista de variantes */}
    </>
  );
}
