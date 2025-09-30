import ContentTienda from "@/components/tiendas/ContentTienda";
import HeaderTiendas from "@/components/tiendas/HeaderTiendas";
import getToken from "@/src/auth/token";
import { BranchsAPIResponseSchema } from "@/src/schemas";

async function getBranch() {
  const token = await getToken();
  const url = `${process.env.API_URL}/business/branch`;

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  const branchs = BranchsAPIResponseSchema.parse(json);
  return branchs;
}
export default async function TiendasPage() {
  const branchs = await getBranch();
  return (
    <div className="flex-1 flex h-full px-10 flex-col bg-surface-base overflow-hidden">
      <HeaderTiendas />
      <ContentTienda branchs={branchs} />
    </div>
  );
}
