import FloatingSupportButton from "@/components/soporte/FloatingSupportButton";
import PreguntasFrecuentes from "@/components/soporte/PreguntasFrecuentes";

export default function SoportePage() {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-surface-base ">
      <header className=" px-11 p-6 flex-shrink-0 ">
        <h1 className="text-3xl font-semibold">Centro de Soporte</h1>
      </header>

      <div className="flex-1 px-11">
        <PreguntasFrecuentes />
      </div>
      <FloatingSupportButton />
    </div>
  );
}
