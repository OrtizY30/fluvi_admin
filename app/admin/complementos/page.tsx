import AddonGroupsTable from "@/components/addonsGroups/AddonGroupsTable";
import getToken from "@/src/auth/token";
import { AddonsGroupsArrayAPIResponseSchema } from "@/src/schemas";

async function getAddonsGroups() {
  const token = await getToken();
  const url = `${process.env.API_URL}/addongroups`;

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  const addonroups = AddonsGroupsArrayAPIResponseSchema.parse(json);
  return addonroups;
}

export default async function ComplementosPage() {
  const addonGroups = await getAddonsGroups();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-surface-base ">
      <header className=" flex-shrink-0 p-6 px-11">
       
        
          <h1 className="text-3xl font-semibold">Grupos de Complementos</h1>
     
      </header>

      <AddonGroupsTable addonGroups={addonGroups} />
    </div>
  );
}
