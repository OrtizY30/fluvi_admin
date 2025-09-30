import { CreditCard, Link, Shield, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect } from "react";

export default function ConfigurationTabs() {
  const pathname = usePathname();
  const router = useRouter()
   useEffect(() => {
      if (pathname === "/admin/configuracion") {
        router.replace("/admin/configuracion/cuenta")
      }
    }, [pathname, router])

  const getIcon = (key: string) => {
    switch (key) {
      case "cuenta":
        return <UserRound strokeWidth={1.5} className="size-5 mr-2" />
      case "seguridad":
        return <Shield className="size-5 mr-2" strokeWidth={1.5} />
      case "facturacion":
        return <CreditCard className="size-5 mr-2" strokeWidth={1.5} />
      default:
        return null
    }
  }

  const tabs = [
    { href: "/admin/configuracion/cuenta", label: "Cuenta", key: "cuenta" },
    { href: "/admin/configuracion/seguridad", label: "Seguridad", key: "seguridad" },
    { href: "/admin/configuracion/facturacion", label: "Facturación", key: "facturacion" },
  ]
  return (
    <div className="flex gap-6 mb-4 py-2 px-11 bg-gray-100">
           {tabs.map((tab) => (
             <Link
               key={tab.href}
               href={tab.href}
               className={clsx(
                 "px-8 py-2  flex items-center rounded-md text-sm font-semibold transition",
                 pathname === tab.href
                   ? "border bg-surface-base border-gray-100 shadow-md text-gray-600"
                   : "text-gray-600"
               )}
             >
               {getIcon(tab.key)}
               {tab.label}
             </Link>
           ))}
         </div>
  );
}
