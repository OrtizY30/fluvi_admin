import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";
import Image from "next/image";

export default function confirmAccountPage() {
  return (
    <>
      
      
      <div className="flex flex-col pt-10 px-2 items-center justify-center gap-6 mx-auto w-full">
        <div className="w-[400px] h-20 relative ">
          <Image src={"/logo-fluvi.svg"} fill alt="logo fluvi" />
        </div>
        <h1 className="text-2xl font-black text-white">
          ¿Confirma tu cuenta
        </h1>
      <ConfirmAccountForm />
      </div>
    </>
  );
}
