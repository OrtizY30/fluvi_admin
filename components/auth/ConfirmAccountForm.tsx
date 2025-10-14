"use client";

import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { confirmAccount } from "@/actions/auth/confirm-account-action";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";

export default function ConfirmAccountForm() { 
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const [token, setToken] = useState("");

  const confirmAccountWithToken = confirmAccount.bind(null, token);
  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: "",
  });
  
  useEffect(() => {
    if (isComplete) {
      startTransition(() => {
        dispatch();
      });
    }
  }, [isComplete]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }
    if (state.success) {
      toast.success(<FluviToast type={"success"} msg={state.success} />, {
         autoClose: 3000,
        onClose: () => {
          router.push("/auth/login");
          router.refresh();
        },
      });
    }
  }, [state, router]);

  const handleChange = (token: string) => {
    setIsComplete(false);
    setToken(token);
  };
  const handleComplete = () => {
    setIsComplete(true);
  };
  return (
    <>
      {" "}
      <p className="text-md text-brand-primary text-center font-semibold">
        Ingresa el código que recibiste
        <span className=" text-white bg-brand-primary p-1 rounded-md ml-1">
          {" "}
          por email
        </span>
      </p>
      <div className="flex  justify-center gap-5 my-6">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="w-10 h-14 text-black text-center border border-gray-300  rounded-lg bg-white " />
          <PinInputField className="w-10 h-14 text-black text-center border border-gray-300  rounded-lg bg-white " />
          <PinInputField className="w-10 h-14 text-black text-center border border-gray-300  rounded-lg bg-white " />
          <PinInputField className="w-10 h-14 text-black text-center border border-gray-300  rounded-lg bg-white " />
          <PinInputField className="w-10 h-14 text-black text-center border border-gray-300  rounded-lg bg-white " />
          <PinInputField className="w-10 h-14 text-black text-center border border-gray-300  rounded-lg bg-white " />
        </PinInput>
      </div>
    </>
  );
}
