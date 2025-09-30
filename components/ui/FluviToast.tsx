
type FluviToastProps = {
  type: "success" | "error" | "info" | "warning";
  msg: string;
};

export function FluviToast({ type, msg }: FluviToastProps) {

  return (
    <div
      className={`relative bg-transparent gap-1 flex items-star w-full `}
    >
      <div className="flex-1 min-w-0">
        {type === "success" ? (
          <h1 className="text-md font-bold text-black">
            Operación Exitosa
          </h1>
        ) : (
          <h1 className="text-md font-bold  text-black ">Error</h1>
        )}

        <p className="text-xs font-light"> {msg}</p>
        {/* </div> */}
      </div>
    </div>
  );
}
