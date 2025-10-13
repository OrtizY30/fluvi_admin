import Image from "next/image";

export default function NotFound() {
  return (
    <div className="px-4 flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
      {/* <Frown className="h-20 w-20 text-gray-500 mb-4" /> */}
      <div className="relative h-40 w-40">
        <Image src="/Fluvisvg.svg" alt="Logo" fill className="h-12 w-12 mb-4" />
      </div>
      <h2 className="text-2xl text-gray-600 mb-4">Página no encontrada</h2>
      <p className="text-gray-500 mb-6">
        Lo sentimos, no pudimos encontrar la página que buscas.
      </p>
    </div>
  );
}
