
import { useUserStore } from "@/store/useUserStore";

// ajusta la ruta
const currencyMap: Record<string, { locale: string; currency: string }> = {
  colombia: { locale: "es-CO", currency: "COP" },
  mexico: { locale: "es-MX", currency: "MXN" },
  argentina: { locale: "es-AR", currency: "ARS" },
  venezuela: { locale: "es-VE", currency: "VES" },
  ecuador: { locale: "es-EC", currency: "USD" },
  peru: { locale: "es-PE", currency: "PEN" },
  chile: { locale: "es-CL", currency: "CLP" },
};


export function formatCurrency(price: number, country: string): string {
 // default: Colombia

  const config = currencyMap[country] || currencyMap["colombia"];

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 0,
  }).format(price);
}


export function formatDate(isoString: Date){
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat('es-ES', {
    month: '2-digit',
    day: 'numeric',
    year: 'numeric',
  })

  return formatter.format(date);
}


export function getImagetPath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if(imagePath.startsWith(cloudinaryBaseUrl)){
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}