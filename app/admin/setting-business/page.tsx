export const dynamic = "force-dynamic";
export const revalidate = 0;

import HeaderSetting from "@/components/configuracion/HeaderSetting";
import InfoBusiness from "@/components/configuracion/InfoBusiness";
import getToken from "@/src/auth/token";
import { BranchsAPIResponseSchema } from "@/src/schemas";

async function getBranch() {
  try {
    const token = await getToken();
    if (!token) {
      console.warn("⚠️ No hay token disponible");
      return [];
    }

    const url = `${process.env.API_URL}/business/branch`;
    const req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // 👈 importante si quieres forzar que siempre se traiga fresco
    });

    if (!req.ok) {
      console.error("❌ Error en la API:", req.status, req.statusText);
      return [];
    }

    const json = await req.json();

    // Si la data no es válida, esto puede lanzar error
    const branches = BranchsAPIResponseSchema.parse(json);
    return branches;
  } catch (error) {
    console.error("❌ Error obteniendo branches:", error);
    return [];
  }
}

export default async function SettingPage() {
  const branches = await getBranch();
  return (
    <div className="flex-1 p-10 space-y-4 flex h-full flex-col bg-surface-base overflow-hidden">
      <HeaderSetting />
      <InfoBusiness branches={branches} />
    </div>
  );
}
