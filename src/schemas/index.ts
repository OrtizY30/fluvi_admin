import { string, z } from "zod";

export const RegisterShcema = z
  .object({
    name: z.string().min(1, { message: "Tu Nombre no puede ir vacío." }),
    email: z
      .string()
      .min(1, { message: "El Email es obligatorio." })
      .email({ message: "Email no valido." }),
    password: z
      .string()
      .min(8, { message: "Tu contraseña debe tener minimo 8 caracteres." }),
    password_confirmation: z.string(),
    subscriptionType: z
      .string()
      .min(1, { message: "Debes elegir una suscriptción." }),
    phone: z
      .string()
      .min(1, { message: "Tu número de telefono es obligatorio." }),
    country: z.string().min(1, { message: "Elige un país" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden.",
    path: ["password_confirmation."],
  });

export const TokenSchema = z
  .string({ message: "Token no valido." })
  .length(6, { message: "Token no válido." });

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio." })
    .email({ message: "Email no válido." }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden.",
    path: ["password_confirmation."],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es obligatorio" })
    .email({ message: "Email no válido" }),
  password: z.string().min(1, { message: "Debes ingresar una contraseña." }),
});

export const DraftCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre de la categoría es obligatorio." }),
});

export const DraftVariantSchema = z.object({
  name: z.string(),
  price: z.number(),
  discount: z.number().default(0),
});

export const DraftProductSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "El Nombre el producto es obligatorio." }),
    price: z.number({ message: "El precio debe ser un numero." }),
    description: z.string(),
    image: z.string(),
    isOnSale: z.boolean(),
    discount: z.number({
      message: "El precio de oferta debe ser un un número.",
    }),
    modifiers: z
      .array(z.number().int("Los IDs de grupo deben ser enteros"))
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.isOnSale) return data.discount === 0;
      return true;
    },
    {
      message: "Si el producto no está en oferta, el descuento debe ser 0.",
      path: ["discount"],
    }
  );

export const DraftAddonsGroupSchema = z.object({
  name: z.string().min(1, { message: "El Nombre del grupo es obligatorio." }),
  required: z.coerce.boolean(),
  maxSelections: z.coerce
    .number()
    .int()
    .min(1, { message: "Debe permitir al menos una selección." })
    .optional(), // o .default(1) si quieres tener un valor fijo
});
export const DraftAddonSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre de la opción es obligatorio." }),
  price: z.number().optional(),
});

export const DraftSocialSchema = z.object({
  instagram: z.string().nullable().optional(),
  facebook: z.string().nullable().optional(),
  tiktok: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
});

export const DraftBranchSchema = z.object({
  name: z.string().min(1, { message: "El campo descripción es obligatorio." }),
  address: z.string().min(1, { message: "El campo dirección es obligatorio." }),
  phone: z.string().min(1, { message: "El campo teléfono es obligatorio." }),
});

export const DraftHorarySchema = z.object({
  day: z.string().min(1, { message: "El día es obligatorio." }),
  openTime: z
    .string()
    .min(1, { message: "La hora de apertura es obligatoria." }),
  closeTime: z
    .string()
    .min(1, { message: "La hora de cierre es obligatoria." }),
});

export const DraftProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre del restaurante es obligatorio." }),
  description: z.string().optional(),
  image: z.string().optional(),
  logo: z.string().optional(),
});
export const DraftThemeSchema = z.object({
  primary: z.string().min(1, { message: "El color primario es obligatorio." }),
  secondary: z
    .string()
    .min(1, { message: "El color secundario es obligatorio." }),
});

export const DraftBannerSchema = z.object({
  banner: z
    .string()
    .nullable() // acepta null
    .or(z.literal("")), // acepta string vacío
});

export const PasswordValidationSchema = z
  .string()
  .min(1, { message: "Contraseña no válida" });

export const SuccessSchema = z.string();

export const ErrorResponSchema = z.object({
  error: z.string().optional(),
});

export const businessSchema = z.object({
  id: z.number(),
  // ✅ Permite null u opcional cuando el usuario no ha puesto nombre aún
  name: z.string().min(1, "El nombre es requerido").nullable().optional(),
  // ✅ No usamos .url() porque si el backend devuelve un string vacío falla.
  image: z.string().optional().nullable(),
  banner: z.string().optional().nullable(),
  popups: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  description: z.string().optional().nullable(),

  // ✅ Permite que el backend envíe null, sino z.boolean() falla
  isOpen: z.boolean().nullable().optional().default(true),

  // ✅ Si el backend devuelve "1" como string, no fallará
  userId: z.union([z.number().int(), z.string()]),

  theme: z.any().optional(),
  branches: z.any().optional(),
  categories: z.array(z.any()).optional(),
  socialMedia: z.any().optional(),
  modifierGroups: z.any().optional(),
  paymentMethod: z.array(z.any()).optional(),
  horary: z.any().optional(),
  user: z.any().optional(),
});

export const BusinessApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),

  image: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  popups: z.string().nullable().optional(),
  logo: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  isOpen: z.boolean(),

  // Relaciones simplificadas
  theme: z.any().optional(),
  branches: z.any().optional(),
  categories: z.any().optional(),
  socialMedia: z.any().optional(),
  modifiersGroups: z.any().optional(),
  horary: z.any().optional(),
  paymentMethod: z.any(),
  user: z.any().optional(),

  userId: z.number(),
});

export const VariantApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  discount: z.number(),
  variantGroupId: z.number(),
});

export const VariantGroupApiResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  variants: z.array(VariantApiResponseSchema),
  productId: z.number(),
});

export const ProductAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string().nullable(),
  price: z.number(),
  isAvailable: z.boolean(),
  isOnSale: z.boolean(),
  discount: z.number(),
  categoryId: z.number(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  modifiers: z.array(
    z.object({
      modifierGroup: z.object({
        id: z.number(),
        name: z.string(),
        required: z.boolean(),
        position: z.number(),
        maxSelections: z.number().int(),
        modifiers: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            price: z.number().nullable(),
            discount: z.number().optional(),
          })
        ),
      }),
    })
  ),
  variantGroup: VariantGroupApiResponseSchema.nullable(),
});

// Enum correspondiente a SubscriptionType
export const SubscriptionTypeEnum = z.enum(["free", "simple", "pro"]); // Ajusta los valores reales

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  domain: z.string(),
  email: z.string().email(),
  phone: z.string(),
  country: z.string(),
  subscriptionEnd: z.coerce.date().nullable().optional(),
  subscriptionType: SubscriptionTypeEnum,
  isActive: z.boolean(),
  business: businessSchema,
});

export const BranchAPIResponseSchema = z.object({
  id: z.number(),
  name: string(),
  address: z.string(),
  phone: z.string(),
  businessId: z.number(),
});

export const MethodApiResponse = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean(),
  businessId: z.number(),
});

export const ThemeApiResponseSchema = z.object({
  id: z.number(),
  fontColor: z.string(),
  otherColors: z.string(),
  discountColor: z.string(),
  buttonBgColor: z.string(),
  buttonTextColor: z.string(),
  backgroundColor: z.string(),
  cardContrastColor: z.string(),
  businessId: z.number(),
});

export const CategoryAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  position: z.number(),
  businessId: z.number(),
  products: z.array(ProductAPIResponseSchema),
});

export const ModifierGroupsAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  required: z.boolean(),
  maxSelections: z
    .number()
    .int()
    .nullable()
    .transform((val) => val ?? Infinity),
  selectionType: z.string(),
  modifiers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number().nullable(),
    })
  ),
});
export const ModifierAPIResponseSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  price: z.number().nullable(),
});

export const SocialMediaApiResponseSchema = z.object({
  id: z.number(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
});

export const HoraryApiResponseSchema = z.object({
  id: z.number(),
  day: z.string(),
  openTime: z.string(),
  closeTime: z.string(),
  businessId: z.number(),
});

export const CategoriesAPIResponseSchema = z.array(CategoryAPIResponseSchema);
export const ProductsAPIResponseSchema = z.array(ProductAPIResponseSchema);
export const VariantsAPIResponseSchema = z.array(VariantApiResponseSchema);
export const MethodsApiResponse = z.array(MethodApiResponse);
export const ModifierGroupsArrayAPIResponseSchema = z.array(
  ModifierGroupsAPIResponseSchema
);
export const HorariesApiResponseSchema = z.array(HoraryApiResponseSchema);

export const BranchsAPIResponseSchema = z.array(BranchAPIResponseSchema);
export const SocialMediaApiArrayResponseSchema = z.array(
  SocialMediaApiResponseSchema
);
export const AddonsArrayAPIResponseSchema = z.array(ModifierAPIResponseSchema);

export type User = z.infer<typeof UserSchema>;
export type Business = z.infer<typeof businessSchema>;
export type Category = z.infer<typeof CategoryAPIResponseSchema>;
export type Product = z.infer<typeof ProductAPIResponseSchema>;
export type ModifierGroup = z.infer<typeof ModifierGroupsAPIResponseSchema>;
export type Modifier = z.infer<typeof ModifierAPIResponseSchema>;
export type SocialMedia = z.infer<typeof SocialMediaApiResponseSchema>;
export type Branch = z.infer<typeof BranchAPIResponseSchema>;
export type Horary = z.infer<typeof HoraryApiResponseSchema>;
export type Profile = z.infer<typeof BusinessApiResponseSchema>;
export type Variant = z.infer<typeof VariantApiResponseSchema>;
export type VariantGroup = z.infer<typeof VariantGroupApiResponseSchema>;
export type Methods = z.infer<typeof MethodApiResponse>;
export type Theme = z.infer<typeof ThemeApiResponseSchema>;

// types.ts o donde prefieras
export type RegisterFormFields = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  subscriptionType: string;
  phone: string;
  country: string;
};

export type ActionStateType = {
  errors: string[];
  success?: string;
  data: Partial<RegisterFormFields>;
};
