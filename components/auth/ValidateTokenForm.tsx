"use client";

import { validateToken } from "@/actions/auth/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";

type ValidateTokenFormProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};
export default function ValidateTokenForm({
  setIsValidToken,
  token,
  setToken,
}: ValidateTokenFormProps) {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);

  const validateTokenInput = validateToken.bind(null, token);
  const [state, dispatch] = useActionState(validateTokenInput, { 
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
      toast.success(<FluviToast type="success" msg={state.success} />);
      setIsValidToken(true);
      router.refresh();
    }
  }, [state, setIsValidToken, router]);

  const handleChange = (token: string) => {
    setToken(token);
    setIsComplete(false);
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
