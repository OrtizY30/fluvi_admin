import HeaderSetting from "@/components/configuracion/HeaderSetting";
import InfoBusiness from "@/components/configuracion/InfoBusiness";
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

  const branches = BranchsAPIResponseSchema.parse(json);
  return branches;
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
