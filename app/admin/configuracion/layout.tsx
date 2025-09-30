'use client'

import { CreditCard, Shield, UserRound } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import clsx from "clsx"
import Link from "next/link"

export default function ConfiguracionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
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
    { href: "/admin/configuracion/suscripcion", label: "Suscripción", key: "suscripcion" },
  ]

  return (
    <div className="flex-1 flex h-full flex-col bg-surface-base overflow-hidden">
      <header className="p-6 px-11 flex-shrink-0">
        <h1 className="text-3xl font-semibold">Configuración</h1>
      </header>

      <div className="flex gap-6  py-2 px-11 ">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              "px-8 py-2  flex items-center rounded-md text-sm font-semibold transition",
              pathname === tab.href
                ? " bg-brand-primary  text-white shadow-md"
                : "text-gray-600 hover:bg-brand-primary/10 transition-all"
            )}
          >
            {getIcon(tab.key)}
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="px-11 py-6 overflow-y-auto">{children}</div>
    </div>
  )
}
