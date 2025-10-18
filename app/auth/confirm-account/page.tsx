import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";
import Logotipo from "@/components/ui/Logotipo";


export default function confirmAccountPage() {
  return (
    <>
      <div className="flex flex-col pt-10 px-2 items-center justify-center gap-6 mx-auto w-full">
      <Logotipo/>

        <h1 className="text-2xl font-black text-white">Confirma tu cuenta</h1>
        <ConfirmAccountForm />
      </div>
    </>
  );
}
